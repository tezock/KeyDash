

function Settings( {setQuoteLength} ) {

    const handle50 = () => {
      setQuoteLength(50);
    }

    const handle125 = () => {
      setQuoteLength(125);
    }

    const handle250 = () => {
      setQuoteLength(250);
    }


    return (
      <nav className="settings app-section">
        
        <div className="settings-content">
          <div class="dropdown">
            <button class="dropbtn">Quote Length</button>
            <div class="dropdown-content">
              <button onClick={handle50}>short</button>
              <button onClick={handle125}>medium</button>
              <button onClick={handle250}>long</button>
            </div>
          </div>
        </div>
  
      </nav>
    );
  }
  
  export default Settings;
  