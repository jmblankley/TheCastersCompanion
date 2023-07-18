import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import Search from './components/Search';
import AllSpells from './pages/AllSpells';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Search></Search>
      <AllSpells></AllSpells>
      <BottomNav></BottomNav>
    </>
  );
}

export default App;
