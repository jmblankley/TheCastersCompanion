import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

const AllSpells = () => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching spell details:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching spell list:', error);
        setIsLoading(false);
      });
  };

  const handleSearch = (searchQuery) => {
    console.log('handleSearch triggered with:', searchQuery);
    const filteredSpells = spells.filter((spell) =>
      spell.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered Spells after search:', filteredSpells);
    setFilteredSpells(filteredSpells);
  };

  const handleFilter = (filters) => {
    setFilteredSpells((prevFilteredSpells) => {
      const newFilteredSpells = prevFilteredSpells.filter((spell) => {
        const levelFilterMatch =
          !filters.level ||
          parseInt(spell.level, 10) === parseInt(filters.level, 10);
        const schoolFilterMatch =
          !filters.school || spell.school === filters.school;
        return levelFilterMatch && schoolFilterMatch;
      });

      return newFilteredSpells;
    });
    if (!filters.level && !filters.school) {
      setFilteredSpells(spells);
    }
  };

  useEffect(() => {
    getSpells();
  }, []);

  return (
    <>
      <Search onSearch={handleSearch} onFilter={handleFilter} />
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
            {isLoading ? (
              // Display a loading spinner while data is being loaded
              <tr>
                <td
                  colSpan="3"
                  className="text-center align-middle"
                  style={{ height: '400px' }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: '100%' }}
                  >
                    <div className="spinner-border brand500" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              // Render the spells when data is loaded
              filteredSpells.map((spell) => (
                <tr key={spell.index}>
                  <td className="fs-6">
                    <Link to={`/spell/${spell.index}`}>{spell.name}</Link>
                  </td>
                  <td className="fs-6">{spell.level}</td>
                  <td className="fs-6">{spell.school}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllSpells;
