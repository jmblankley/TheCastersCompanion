import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SpellbookContext } from '../context/SpellbookContext';
import { useAuthContext } from '../hooks/useAuthContext';

const MySpells = () => {
  const { selectedSpells, equippedSpells, equipSpell } =
    useContext(SpellbookContext);
  const { user } = useAuthContext();

  return (
    <div className="container spellbook">
      {/* Check if the user is authenticated */}
      {user ? (
        <>
          {selectedSpells.length === 0 ? (
            <p>Your spellbook is empty.</p>
          ) : (
            <ul>
              {selectedSpells.map((spell) => (
                <li className="fs-4 spellEquip" key={spell.index}>
                  <Link to={`/spell/${spell.index}`}>
                    <div className="spellname">{spell.name}</div>
                  </Link>
                  <button
                    className={
                      equippedSpells.some(
                        (equippedSpell) => equippedSpell.index === spell.index
                      )
                        ? 'equippedButton'
                        : 'equipButton'
                    }
                    onClick={() => equipSpell(spell)}
                  >
                    {equippedSpells.some(
                      (equippedSpell) => equippedSpell.index === spell.index
                    )
                      ? 'Equipped'
                      : 'Equip'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Please log in to view your spellbook.</p>
      )}
    </div>
  );
};

export default MySpells;
