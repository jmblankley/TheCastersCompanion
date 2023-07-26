import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { SpellbookProvider } from './context/SpellbookContext';
import AllSpells from './pages/AllSpells';
import EquippedSpells from './pages/EquippedSpells';
import Login from './pages/Login';
import MySpells from './pages/MySpells';
import Signup from './pages/Signup';
import SingleSpell from './pages/SingleSpell';

function App() {
  return (
    <AuthContextProvider>
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
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
              </Routes>
            </div>
            <BottomNav />
          </>
        </Router>
      </SpellbookProvider>
    </AuthContextProvider>
  );
}

export default App;
