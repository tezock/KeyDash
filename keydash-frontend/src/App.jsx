import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from '../pages/TestPage';
function App() {

  return (
    <>
    
      <Router>

        <Routes>
          
          <Route element={<TestPage/>} path="/" exact/>;
          
        </Routes>

      </Router> 
    </>
  )
}

export default App
