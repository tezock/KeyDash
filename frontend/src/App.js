import logo from './logo.svg';

import QuoteTest from './components/QuoteTest';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
        <div className="app-box">
          <div className="app-box-content">
            
             <Router>
              <NavBar />

              <Routes>
                
                <Route element={<QuoteTest />} path="/" exact/>;
                
              </Routes>

              <Footer />
            </Router> 
          </div>
        </div>
    </div>
  );
}

export default App;
