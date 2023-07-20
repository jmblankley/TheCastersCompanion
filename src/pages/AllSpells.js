import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

const AllSpells = () => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const API = `https://www.dnd5eapi.co/api/spells`;

  const getSpells = () => {
    Axios.get(API)
      .then((res) => {
        const spellIndices = res.data.results.map((spell) => spell.index);
        const spellPromises = spellIndices.map((index) =>
          Axios.get(`${API}/${index}`)
        );

        Promise.all(spellPromises)
          .then((responses) => {
            const spellsWithData = responses.map((response) => {
              const level =
                response.data.level === 0 ? 'Cantrip' : response.data.level;
              return {
                index: response.data.index,
                name: response.data.name,
                level: level,
                school: response.data.school.name,
              };
            });
            setSpells(spellsWithData);
            setFilteredSpells(spellsWithData);
          })
          .catch((error) => {
            console.error('Error fetching spell details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching spell list:', error);
      });
  };

  useEffect(() => {
    getSpells();
  });

  const handleSearch = (searchQuery) => {
    const filteredSpells = spells.filter((spell) =>
      spell.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpells(filteredSpells);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="container allSpells">
        <table>
          <thead>
            <tr>
              <th className="fs-5">Name</th>
              <th className="fs-5">Level</th>
              <th className="fs-5">School</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpells.map((spell) => (
              <tr key={spell.index}>
                <td className="fs-6">
                  <Link to={`/spell/${spell.index}`}>{spell.name}</Link>
                </td>
                <td className="fs-6">{spell.level}</td>
                <td className="fs-6">{spell.school}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllSpells;
