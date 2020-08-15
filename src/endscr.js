import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function Endscr(){
    useEffect(() => {
        getScore();
    },[]);
    return(
        <div id="game" className="endscr">
            <div id="timeup" className="raleway" style={{'fontSize':'50px','color':'yellow','textAlign':'center', 'display':'none'}}>
                Time up!
            </div>
            <div id="congo" className="raleway" style={{'fontSize':'50px','color':'yellow','textAlign':'center', 'display':'none'}}>
                Congratulations!
            </div>
            <div className="raleway" style={{'fontSize':'50px','textAlign':'center'}}>
                Score:
                <div id="endscore" className="endscore">
                    10
                </div>
            </div>
            
            <div id="play">
                <Link to="/">
                    <button className="gameBtn" style={{'fontWeight': '700', 'fontSize':'20px'}}>
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