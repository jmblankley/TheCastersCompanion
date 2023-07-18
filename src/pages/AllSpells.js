import Axios from 'axios';
import { useEffect, useState } from 'react';

const AllSpells = () => {
  const [spells, setSpells] = useState([]);
  const API = `https://www.dnd5eapi.co/api/spells`;

  const getSpells = () => {
    Axios.get(API).then((res) => {
      // Extract the spell index from the initial API response
      const spellIndices = res.data.results.map((spell) => spell.index);
      // Make individual API calls for each spell to get the level and school information
      const spellPromises = spellIndices.map((index) =>
        Axios.get(`${API}/${index}`)
      );
      // Wait for all API calls to resolve
      Promise.all(spellPromises)
        .then((responses) => {
          // Extract the level and school information from the individual spell responses
          const spellsWithData = responses.map((response) => {
            const level =
              response.data.level === 0 ? 'Cantrip' : response.data.level;
            return {
              index: response.data.index,
              name: response.data.name,
              level: level,
              school: response.data.school.name, // Extract the school name
            };
          });
          // Update the state with the spells and their level and school information
          setSpells(spellsWithData);
        })
        .catch((error) => {
          console.error('Error fetching spell details:', error);
        });
    });
  };

  useEffect(() => {
    getSpells();
  });

  return (
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
          {spells &&
            spells.map((spell) => (
              <tr key={spell.index}>
                <td className="fs-6">{spell.name}</td>
                <td className="fs-6">{spell.level}</td>
                <td className="fs-6">{spell.school}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSpells;
