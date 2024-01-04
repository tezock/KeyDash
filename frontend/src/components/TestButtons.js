
function TestButtons( { props }) {
    return (
      <div className="test-buttons-container">

        <div className="test-buttons-content">

          
          <button className="test-button">Next Test</button>
          
          <button onClick={props.resetTest} className="test-button">Report Issue</button>
          <button className="test-button">Send a Quote!</button>
          <button className="test-button">Replay</button>
          

        </div>
  
      </div>
    );
  }
  
  export default TestButtons;
  