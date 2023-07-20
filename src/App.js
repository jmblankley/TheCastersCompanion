import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import { SpellbookProvider } from './context/SpellbookContext';
import AllSpells from './pages/AllSpells';
import EquippedSpells from './pages/EquippedSpells';
import MySpells from './pages/MySpells';
import SingleSpell from './pages/SingleSpell';

function App() {
  return (
    <SpellbookProvider>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<AllSpells />} />
              <Route path="/spell/:spellId" element={<SingleSpell />} />
              <Route path="/spellbook" element={<MySpells />} />
              <Route path="/equippedspells" element={<EquippedSpells />} />
            </Routes>
          </div>
          <BottomNav />
        </>
      </Router>
    </SpellbookProvider>
  );
}

export default App;
