

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
      <nav className="settings">
        
        <div className="settings-content">
          {/* <div className="dropdown">
            <button className="dropbtn">Quote Length</button>
            <div className="dropdown-content">
              <button onClick={handle50}>short</button>
              <button onClick={handle125}>medium</button>
              <button onClick={handle250}>long</button>
            </div>
          </div>  */}

          <button className="setting-item">Quote Length</button>
          <div className="vertical-rule"></div>
          <button className="setting-item" onClick={handle50}>short</button>
          <button className="setting-item" onClick={handle125}>medium</button>
          <button className="setting-item" onClick={handle250}>long</button> 
          
        </div>
  
      </nav>
    );
  }
  
  export default Settings;
  