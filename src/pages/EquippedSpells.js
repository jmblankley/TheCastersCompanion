import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpellbookContext } from '../context/SpellbookContext';
import { useAuthContext } from '../hooks/useAuthContext';

const EquippedSpells = () => {
  const { user } = useAuthContext();
  const { equippedSpells, setEquippedSpells } = useContext(SpellbookContext);
  const [isSpellSlotsModalOpen, setIsSpellSlotsModalOpen] = useState(false);
  const [isSetRestModalOpen, setIsSetRestModalOpen] = useState(false);
  const [spellSlotsCount, setSpellSlotsCount] = useState(() => {
    const storedSpellSlotsCount = localStorage.getItem('spellSlotsCount');
    return storedSpellSlotsCount ? parseInt(storedSpellSlotsCount, 10) : 1;
  });
  const [rest, setRest] = useState(() => {
    const storedRest = localStorage.getItem('restCount');
    return storedRest ? parseInt(storedRest, 10) : 1;
  });
  const [maxSpellSlots, setMaxSpellSlots] = useState(spellSlotsCount);

  useEffect(() => {
    localStorage.setItem('spellSlotsCount', spellSlotsCount.toString());
    localStorage.setItem('rest', rest.toString());
    const storedEquippedSpells = localStorage.getItem('equippedSpells');
    if (storedEquippedSpells) {
      setEquippedSpells(JSON.parse(storedEquippedSpells));
    }
  }, [spellSlotsCount, rest, maxSpellSlots, setEquippedSpells]);

  const updateSpellSlots = () => {
    setIsSpellSlotsModalOpen(true);
  };

  const closeModal = () => {
    setIsSpellSlotsModalOpen(false);
    setIsSetRestModalOpen(false);
  };

  const handleSpellSlotsChange = (event) => {
    const newSpellSlotsCount = parseInt(event.target.value, 10);
    setMaxSpellSlots(newSpellSlotsCount);
    setSpellSlotsCount(newSpellSlotsCount);
    localStorage.setItem('spellSlotsCount', newSpellSlotsCount.toString());
  };

  const handleSetRestClick = () => {
    setIsSetRestModalOpen(true);
  };

  const handleCastClick = (spell, index) => {
    if (spell > 0) {
      setSpellSlotsCount(spellSlotsCount - 1);
    }
  };

  const handleRestChange = (e) => {
    const newRest = parseInt(e.target.value, 10);
    setRest(newRest);
    localStorage.setItem('rest', newRest.toString());
  };

  const handleRest = () => {
    const restingSlots = spellSlotsCount + rest;
    if (spellSlotsCount < maxSpellSlots) {
      setSpellSlotsCount(restingSlots);
    }
    if (restingSlots > maxSpellSlots) {
      setSpellSlotsCount(maxSpellSlots);
    }
  };

  return (
    <div className="container spellbook">
      {user ? (
        <div>
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
              {spellSlotsCount === maxSpellSlots && (
                <h3 className="m-0">Max</h3>
              )}
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
                  <div>
                    <label htmlFor="spellSlotsInput" className="mx-3">
                      Number of Spell Slots:
                    </label>
                    <input
                      type="number"
                      className="text-center mb-3"
                      id="spellSlotsInput"
                      value={maxSpellSlots}
                      onChange={handleSpellSlotsChange}
                      min="1"
                      max="10"
                    />
                  </div>

                  <button className="myButton" onClick={closeModal}>
                    {/* onClick instead of onSubmit */}
                    Save
                  </button>
                </div>
              </div>
            )}

            <div className="restContainer">
              <div className="restSlider">
                <span className="noBorderButton" onClick={handleSetRestClick}>
                  Set Rest
                </span>
              </div>
              <button className="fs-4" onClick={handleRest}>
                Rest
              </button>
            </div>
          </div>

          {isSetRestModalOpen && (
            <div className="modal container">
              <div className="modalContent">
                <span className="closeButton" onClick={closeModal}>
                  &times;
                </span>
                <h2>Set Rest</h2>
                <form onSubmit={closeModal}>
                  <div>
                    <label htmlFor="spellSlotsInput" className="mx-3">
                      Resting Gives:
                    </label>
                    <input
                      type="number"
                      className="text-center mb-3"
                      id="spellSlotsInput"
                      value={rest}
                      onChange={handleRestChange}
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

          {equippedSpells.length === 0 ? (
            <p>No spells are equipped.</p>
          ) : (
            <ul>
              <li className="fs-4 spellCast">
                <div className="col-2">
                  <h2 className="m-0">Name</h2>
                </div>
                <div>
                  <h2 className="m-0">Level</h2>
                </div>
                <div></div>
              </li>
              {equippedSpells.map((spell, index) => (
                <li className="fs-4 spellCast" key={spell.index}>
                  <div className="col-5">
                    <Link to={`/spell/${spell.index}`}>{spell.name}</Link>
                  </div>
                  {spell.level === 0 ? (
                    <div className="mx-2">C</div>
                  ) : (
                    <div className="mx-2">{spell.level}</div>
                  )}
                  <div>
                    <button onClick={() => handleCastClick(spell.level)}>
                      Cast
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="container mt-3">
          <p>Please log in to see equipped spells.</p>
        </div>
      )}
    </div>
  );
};

export default EquippedSpells;
