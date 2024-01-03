
function Footer( {props} ) {

    return (
      <div className="stats-container">
  
        <div className="stats-content">

            <div className="stat">
                <span className="stat-label">wpm </span>
                <span className="stat-value">{props.wpm}</span>
            </div>

            <div className="stat">
                <span className="stat-label">accuracy </span>
                <span className="stat-value">{props.accuracy}%</span>
            </div>

            <div className="stat">
                <span className="stat-label">characters </span>
                <span className="stat-value">0/0/0</span>
            </div>

            <div className="stat">
                <span className="stat-label">time </span>
                <span className="stat-value">0s</span>
            </div>

            <div className="stat">
                <span className="stat-label">author </span>
                <span className="stat-value">John Doe</span>
            </div>
        </div>
  
      </div>
    );
  }
  
  export default Footer;
  