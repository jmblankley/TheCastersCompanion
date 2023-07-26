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
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });
        const spellsFromDatabase = response.data;
        console.log('Fetched spells:', spellsFromDatabase); // Add this console log
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
    console.log('Selected spells:', selectedSpells);
  };

  // Function to equip a spell
  const equipSpell = (spell) => {
    setEquippedSpells((prevEquippedSpells) => {
      // Check if the spell is already equipped
      const isSpellEquipped = prevEquippedSpells.some(
        (equippedSpell) => equippedSpell.index === spell.index
      );

      if (isSpellEquipped) {
        // Remove the spell from the equippedSpells array
        return prevEquippedSpells.filter(
          (equippedSpell) => equippedSpell.index !== spell.index
        );
      } else {
        // Add the spell to the equippedSpells array
        return [...prevEquippedSpells, spell];
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
      }}
    >
      {children}
    </SpellbookContext.Provider>
  );
};

export { SpellbookContext, SpellbookProvider };
