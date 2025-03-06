import './index.css';
import Home from './containers/home/Home';
import Signup from './containers/signup/Signup';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
