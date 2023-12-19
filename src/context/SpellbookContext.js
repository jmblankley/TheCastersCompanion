import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const SpellbookContext = createContext();

const SpellbookProvider = ({ children }) => {
  const { user, token } = useAuthContext();
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [equippedSpells, setEquippedSpells] = useState([]);

  useEffect(() => {
    const fetchSpellsFromDatabase = async () => {
      try {
        const response = await axios.get('/mySpells', {
          baseURL: 'https://casterscompanionserver.onrender.com/',
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });
        const spellsFromDatabase = response.data;
        setSelectedSpells(spellsFromDatabase);
      } catch (error) {
        console.error('Error fetching spells from database:', error);
      }
    };

    if (token) {
      fetchSpellsFromDatabase();
    }
  }, [user, token]);

  // Function to add a new spell to the spellbook
  const addSpellToSpellbook = (spell) => {
    setSelectedSpells((prevSpells) => [...prevSpells, spell]);
  };

  const equipSpell = (spell) => {
    setEquippedSpells((prevEquippedSpells) => {
      const isSpellEquipped = prevEquippedSpells.some(
        (equippedSpell) => equippedSpell.index === spell.index
      );

      if (isSpellEquipped) {
        const updatedEquippedSpells = prevEquippedSpells.filter(
          (equippedSpell) => equippedSpell.index !== spell.index
        );

        localStorage.setItem(
          'equippedSpells',
          JSON.stringify(updatedEquippedSpells)
        );

        return updatedEquippedSpells;
      } else {
        const updatedEquippedSpells = [...prevEquippedSpells, spell];

        localStorage.setItem(
          'equippedSpells',
          JSON.stringify(updatedEquippedSpells)
        );

        return updatedEquippedSpells;
      }
    });
  };

  return (
    <SpellbookContext.Provider
      value={{
        selectedSpells,
        equippedSpells,
        addSpellToSpellbook,
        equipSpell,
        setSelectedSpells,
        setEquippedSpells,
      }}
    >
      {children}
    </SpellbookContext.Provider>
  );
};

export { SpellbookContext, SpellbookProvider };
