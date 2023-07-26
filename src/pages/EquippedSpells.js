import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpellbookContext } from '../context/SpellbookContext';

const EquippedSpells = () => {
  const { equippedSpells } = useContext(SpellbookContext);
  const [isSpellSlotsModalOpen, setIsSpellSlotsModalOpen] = useState(false);
  const [isSetRestModalOpen, setIsSetRestModalOpen] = useState(false);
  const [spellSlotsCount, setSpellSlotsCount] = useState(() => {
    const storedSpellSlotsCount = localStorage.getItem('spellSlotsCount');
    return storedSpellSlotsCount ? parseInt(storedSpellSlotsCount, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('spellSlotsCount', spellSlotsCount.toString());
  }, [spellSlotsCount]);

  const updateSpellSlots = () => {
    setIsSpellSlotsModalOpen(true);
  };

  const closeModal = () => {
    setIsSpellSlotsModalOpen(false);
    setIsSetRestModalOpen(false);
  };

  const handleSpellSlotsChange = (event) => {
    const newSpellSlotsCount = parseInt(event.target.value, 10);
    setSpellSlotsCount(newSpellSlotsCount);
    localStorage.setItem('spellSlotsCount', newSpellSlotsCount.toString());
  };

  const handleSetRestClick = () => {
    setIsSetRestModalOpen(true);
  };

  const handleCastClick = () => {};

  return (
    <div className="container spellbook">
      <div>
        <div className="spellSlotsContainer">
          <div>
            <h2>Spell Slots:</h2>
          </div>
          <div className="spellSlots">
            {Array.from({ length: spellSlotsCount }).map((_, index) => (
              <span className="spellslot" key={index}></span>
            ))}
          </div>
        </div>
        <p className="noBorderButton" onClick={updateSpellSlots}>
          Set Spell Slots
        </p>
        {isSpellSlotsModalOpen && (
          <div className="modal container">
            <div className="modalContent p-5">
              <span className="closeButton" onClick={closeModal}>
                &times;
              </span>
              <h2>Set Spell Slots</h2>
              <form onSubmit={closeModal}>
                <div>
                  <label htmlFor="spellSlotsInput" className="mx-3">
                    Number of Spell Slots:
                  </label>
                  <input
                    type="number"
                    className="text-center mb-3"
                    id="spellSlotsInput"
                    value={spellSlotsCount}
                    onChange={handleSpellSlotsChange}
                    min="1"
                    max="10"
                  />
                </div>

                <button className="myButton" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="restContainer">
          <div className="restSlider">
            <span className="noBorderButton" onClick={handleSetRestClick}>
              Set Rest
            </span>
          </div>
          <button className="fs-4">Rest</button>
        </div>
      </div>

      {isSetRestModalOpen && (
        <div className="modal container">
          <div className="modalContent">
            <span className="closeButton" onClick={closeModal}>
              &times;
            </span>
            <h2>Set Rest</h2>
            {/* Add the content for your "Set Rest" modal here */}
          </div>
        </div>
      )}

      {equippedSpells.length === 0 ? (
        <p>No spells are equipped.</p>
      ) : (
        <ul>
          {equippedSpells.map((spell) => (
            <li className="fs-4 spellCast" key={spell.index}>
              <div>
                <Link to={`/spell/${spell.index}`}>{spell.name}</Link>
              </div>
              <div>
                <button onClick={handleCastClick}>Cast</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EquippedSpells;
