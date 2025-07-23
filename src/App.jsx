import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerPage from './pages/PlayerPage';
import PlayerPage1 from './pages/PlayerPage1';
// import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* You can add a dynamic slug to the path if needed */}
          <Route path="/" element={<PlayerPage1 />} />
          <Route path="/player/:slug" element={<PlayerPage1 />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
