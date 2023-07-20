import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const SpellbookContext = createContext();

const SpellbookProvider = ({ children }) => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [equippedSpells, setEquippedSpells] = useState([]);

  // Fetch spells from your API endpoint and add them to the spellbook
  useEffect(() => {
    const fetchSpellsFromDatabase = async () => {
      try {
        const response = await axios.get('/mySpells');
        const spellsFromDatabase = response.data;
        setSelectedSpells(spellsFromDatabase);
      } catch (error) {
        console.error('Error fetching spells from database:', error);
      }
    };

    fetchSpellsFromDatabase();
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  // Function to add a new spell to the spellbook
  const addSpellToSpellbook = (spell) => {
    setSelectedSpells((prevSpells) => [...prevSpells, spell]);
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
