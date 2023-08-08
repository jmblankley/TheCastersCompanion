import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SpellbookContext } from '../context/SpellbookContext';
import { useAuthContext } from '../hooks/useAuthContext';

const SingleSpell = () => {
  const { spellId, spellIndex } = useParams();
  const [spell, setSpell] = useState({});
  const API = `https://www.dnd5eapi.co/api/spells`;

  const { selectedSpells } = useContext(SpellbookContext);
  const { user } = useAuthContext();

  useEffect(() => {
    if (spellId) {
      axios
        .get(`${API}/${spellId}`)
        .then((response) => {
          const { data } = response;
          setSpell({
            index: data.index,
            name: data.name,
            level: data.level,
            school: data.school.name,
            time: data.casting_time,
            range: data.range,
            duration: data.duration,
            description: data.desc,
          });
        })
        .catch((error) => {
          console.error('Error fetching spell details:', error);
        });
    }
  }, [API, spellId]);

  // Function to handle saving or removing the spell
  const handleSaveSpell = () => {
    if (user) {
      const isSpellInSpellbook = selectedSpells.some(
        (selectedSpell) => selectedSpell.index === spell.index
      );

      // Set the authorization header with the JWT token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (isSpellInSpellbook) {
        // If the spell is already in the spellbook, remove it
        axios
          .delete(`/mySpells/${spell.index}`, config)
          .then((response) => {
            console.log('Spell removed from spellbook:', response.data);
          })
          .catch((error) => {
            console.error('Error removing spell from spellbook:', error);
            // Handle any error, show a notification to the user, etc.
          });
      } else {
        // If the spell is not in the spellbook, add it
        axios
          .post(
            '/mySpells',
            {
              userId: user.id,
              index: spell.index,
              name: spell.name,
              level: spell.level,
              school: spell.school,
              time: spell.time,
              range: spell.range,
              duration: spell.duration,
              description: spell.description,
            },
            config
          )
          .then((response) => {
            console.log('Spell added to spellbook:', response.data);
            // Optionally, you can add a toast or notification to show the user that the spell was saved successfully.
          })
          .catch((error) => {
            console.error('Error saving spell to spellbook:', error);
            // Handle any error, show a notification to the user, etc.
          });
      }
    } else {
      // Handle the case when the user is not logged in, e.g., show a login prompt
      console.log('Please log in to add or remove spells.');
    }
  };

  return (
    <div className="container singleSpellDetails">
      <h2>{spell.name}</h2>
      <h3 className="mediumWeight">
        Level {spell.level} {spell.school}
      </h3>
      <h3>
        <span className="mediumWeight">Casting Time:</span> {spell.time}
      </h3>
      <h3>
        <span className="mediumWeight">Range:</span> {spell.range}
      </h3>
      <h3>
        <span className="mediumWeight">Duration:</span> {spell.duration}
      </h3>
      <h3>
        <span className="mediumWeight">Description:</span> {spell.description}
      </h3>
      <button className="myButton" onClick={handleSaveSpell}>
        {selectedSpells.some(
          (selectedSpell) => selectedSpell.index === spell.index
        )
          ? 'Remove From Spellbook'
          : 'Add To Spellbook'}
      </button>
    </div>
  );
};

export default SingleSpell;
