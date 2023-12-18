import logo from './logo.svg';
import './App.css';

import TypingBox from './components/TypingBox';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Settings from './components/settings';

function App() {
  return (
    <div className="App">
      
        <div className="App-content">
          <NavBar/>
          <Settings/>
          <TypingBox />
          <Footer />
        </div>
    </div>
  );
}

export default App;
