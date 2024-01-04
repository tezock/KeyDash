

function Settings( {setQuoteLength} ) {

    const handleShort = () => {
      setQuoteLength(50);
    }

    const handleMedium = () => {
      setQuoteLength(125);
    }

    const handleLong = () => {
      setQuoteLength(250);
    }


    return (
      <nav className="settings">
        
        <div className="settings-content">
          
          <button className="setting-item" onClick={handleShort}>short</button>
          <button className="setting-item" onClick={handleMedium}>medium</button>
          <button className="setting-item" onClick={handleLong}>long</button> 
          
        </div>
  
      </nav>
    );
  }
  
  export default Settings;
  