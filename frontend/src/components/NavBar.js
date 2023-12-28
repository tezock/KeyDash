import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {

    const faKeyboard = (<svg xmlns="http://www.w3.org/2000/svg" height="24" width="32" viewBox="0 0 576 512"><path className="logo-keyboard" d="M528 448H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48zM128 180v-40c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-336 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-336 96v-40c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm288 0v-40c0-6.6-5.4-12-12-12H172c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h232c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"/></svg>);
    return (
      <nav className="NavBar app-section">
        
        <div className="nav-content">

            <div className="logo">
                {faKeyboard}
                
                <div className="logo-text">
                  KeyDash
                </div>

                <div className="logo-hook">
                  Elevate your typing experience.
                </div>
            </div>

            <div className="page-links">
              <NavLink to="/" className="nav-link">
                Quote
              </NavLink>
              <NavLink to="/n" className="nav-link">
                Time
              </NavLink>
              <NavLink to="/n" className="nav-link">
                Priority
              </NavLink>
              <NavLink to="/" className="nav-link">
                AI
              </NavLink>
              <NavLink to="/" className="nav-link">
                Race
              </NavLink>
              <NavLink to="/" className="nav-link">
                Stats
              </NavLink>
              <NavLink to="/" className="nav-link">
                About
              </NavLink>
            </div>

            <NavLink to="/" className="nav-link">
              Sign In
            </NavLink>
            <NavLink to="/" className="nav-link">
              Sign Up
            </NavLink>
            
        </div>
  
      </nav>
    );
  }
  
  export default NavBar;
  