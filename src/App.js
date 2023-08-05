import { Route, Routes } from 'react-router-dom';
import './App.css';
import Emsfooter from './components/Emsfooter';
import Emsheader from './components/Emsheader';
import Home from './Pages/Home';
import Register from './Pages/Register';
import View from './Pages/View';
import Edit from './Pages/Edit';

function App() {
  return (
    <>
      <header>
        <Emsheader />
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>

      <footer>
        <Emsfooter />
      </footer>
    </>
  );
}

export default App;
