import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setHighScore, getHighScore } from "./index";

export default function Endscr() {
  useEffect(() => {
    getScore();
    let highscore2 = getHighScore();
    console.log("hs", highscore2);
    setTimeout(() => {
      setHighScore(highscore2);
    }, 100);
  }, []);
  return (
    <div id="game" className="endscr">
      <div
        id="timeup"
        className="raleway"
        style={{
          fontSize: "50px",
          color: "yellow",
          textAlign: "center",
          display: "none",
        }}>
        Time up!
      </div>
      <div
        id="congo"
        className="congo raleway"
        style={{
          color: "yellow",
          textAlign: "center",
          display: "none",
        }}>
        Congratulations!
      </div>
      <div
        id="hs2"
        className="congo raleway"
        style={{
          color: "yellow",
          textAlign: "center",
          display: "none",
        }}>
        New Highscore!
      </div>
      <div
        className="raleway"
        style={{ fontSize: "50px", textAlign: "center" }}>
        Score:
        <div id="endscore" className="endscore">
          10
        </div>
      </div>

      <div id="play">
        <Link to="/">
          <button
            className="gameBtn"
            style={{ fontWeight: "700", fontSize: "20px" }}>
            CONTINUE
          </button>
        </Link>
      </div>
    </div>
  );
}

function getScore() {
  const scoreSpan = document.getElementById("score");
  const scoreResult = document.getElementById("endscore");
  scoreResult.innerHTML = scoreSpan.innerHTML;
}
