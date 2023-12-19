import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SpellbookContext } from '../context/SpellbookContext';
import { useAuthContext } from '../hooks/useAuthContext';

const SingleSpell = () => {
  const { spellId } = useParams();
  const [spell, setSpell] = useState({});
  const API = `https://www.dnd5eapi.co/api/spells`;
  const [addedToSpellbook, setAddedToSpellbook] = useState(false);
  const [removedFromSpellbook, setRemovedFromSpellbook] = useState(false);

  const { selectedSpells, setSelectedSpells } = useContext(SpellbookContext);
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

  const handleSaveSpell = () => {
    if (user) {
      const isSpellInSpellbook = selectedSpells.some(
        (selectedSpell) => selectedSpell.index === spell.index
      );

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (isSpellInSpellbook) {
        axios
          .delete(`https://casterscompanion.onrender.com/mySpells/${spell.index}`, config)
          .then((response) => {
            console.log('Spell removed from spellbook:', response.data);
            setRemovedFromSpellbook(true);
            setSelectedSpells((prevSelectedSpells) =>
              prevSelectedSpells.filter(
                (selectedSpell) => selectedSpell.index !== spell.index
              )
            );
          })
          .catch((error) => {
            console.error('Error removing spell from spellbook:', error);
          });
      } else {
        axios
          .post(
            'https://casterscompanion.onrender.com/mySpells',
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
            setAddedToSpellbook(true);
            setSelectedSpells((prevSelectedSpells) => [
              ...prevSelectedSpells,
              {
                index: spell.index,
                name: spell.name,
                level: spell.level,
                school: spell.school,
                time: spell.time,
                range: spell.range,
                duration: spell.duration,
                description: spell.description,
              },
            ]);
          })
          .catch((error) => {
            console.error('Error saving spell to spellbook:', error);
          });
      }
    } else {
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
      {addedToSpellbook && (
        <p className="success">Successfully added spell to My Spells.</p>
      )}
      {removedFromSpellbook && (
        <p className="success">Successfully removed spell from My Spells.</p>
      )}
    </div>
  );
};

export default SingleSpell;
