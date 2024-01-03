
function Footer( {props} ) {

    return (
      <div className="stats-container">
  
        <div className="stats-content">

            <div className="stat">
                <span className="stat-label">wpm</span>
                <span className="stat-value">{props.wpm}</span>
            </div>

            <div className="stat">
                <span className="stat-label">accuracy</span>
                <span className="stat-value">{props.accuracy}%</span>
            </div>

            <div className="stat">
                <span className="stat-label">characters </span>
                <span className="stat-value">{props.correct}/{props.incorrect}/{props.extra}</span>
            </div>

            <div className="stat">
                <span className="stat-label">test length </span>
                <span className="stat-value">{props.length} chars</span>
            </div>

            <div className="stat">
                <span className="stat-label">time</span>
                <span className="stat-value">{props.time}s</span>
            </div>

            <div className="stat">
                <span className="stat-label">author </span>
                <span className="stat-value">{props.author}</span>
            </div>
        </div>
  
      </div>
    );
  }
  
  export default Footer;
  