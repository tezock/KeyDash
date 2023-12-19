import logo from './logo.svg';

import TypingBox from './components/TypingBox';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Settings from './components/settings';

function App() {
  return (
    <div className="App">
      
        <div className="app-box">
          <div className="app-box-content">
            <NavBar/>
            <TypingBox />
            <Footer />
          </div>
        </div>
    </div>
  );
}

export default App;
