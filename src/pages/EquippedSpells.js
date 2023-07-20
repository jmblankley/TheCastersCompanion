import React, { useContext } from 'react';
import { SpellbookContext } from '../context/SpellbookContext';

const EquippedSpells = () => {
  const { equippedSpells } = useContext(SpellbookContext);

  return (
    <div className="container spellbook">
      {equippedSpells.length === 0 ? (
        <p>No spells are equipped.</p>
      ) : (
        <ul>
          {equippedSpells.map((spell) => (
            <li className="fs-4 spellEquip" key={spell.index}>
              <div>{spell.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EquippedSpells;
