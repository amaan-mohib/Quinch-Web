import React, {useEffect, useState} from 'react'
//import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import BarChartIcon from '@material-ui/icons/BarChart';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {getQues} from './index';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#fff',
    },
  },
});

var i =1;

export default function Game(){
    //let [i, seti] = useState(1);
    useEffect(() => {
        getQues(`ques${i}`);
        console.log(i);
    },[]);
    
    return(
        <div id="game">
            <div id="quesBox" className="quesBox">
                
                <div className="progress">
                    <span style={{'width':'50%'}}></span>
                    <div>
                    
                        <Link to="/" style={{'textDecoration':'none'}} onClick={() => i=1}>
                        
                            <ThemeProvider theme={theme}>
                                <Fab color="primary" size="small">
                                    <CloseIcon titleAccess="Quit" className="whiter"/>
                                </Fab>
                            </ThemeProvider>
                        </Link>
                        
                    </div>
                </div>
                <div className="lifeline">
                    <Lifeline id="l1" option={<BarChartIcon className="iconSpacer2"/>}/>
                    <Lifeline id="l2" option="50 : 50"/>
                    <Lifeline id="l3" option={<SearchIcon className="iconSpacer2"/>}/>
                    <Lifeline id="l4" option={<AutorenewIcon className="iconSpacer2"/>}/>
                </div>
                <div id="ques" className="ques">Loading...</div>
                <div className="options">
                    <Option id="o1" option="Loading"/>
                    <Option id="o2" option="Loading"/>
                    <Option id="o3" option="Loading"/>
                    <Option id="o4" option="Loading"/>
                </div>
                <div id="hiddenDiv" style={{'display':'none'}}></div>
            </div>
        </div>
    );
}
function answerChecker(option){
    const hiddenDiv = document.getElementById("hiddenDiv");
    const checked = option.innerHTML === hiddenDiv.innerHTML;
    if (checked){
        //seti(i=i+1);
        i=i+1;
        //window.location = "/game";
        console.log(i);
        getQues(`ques${i}`);
    }
    else {
        return;
    }
}
export function Lifeline(props){
    return(
        <button id={props.id} className="lifelineBtn">
            {props.option}
        </button>
    );
}

function Option(props){
    return(
        <button id={props.id} className="gameBtn" onClick={() => answerChecker(document.getElementById(`${props.id}`))}>
            {props.option}
        </button>
    );
}

export function Play(){
    return(
        <div id="game">
            <div id="play">
                <Link to="/game">
                    <button id="playBtn" className="gameBtn" style={{'fontWeight': '700', 'fontSize':'50px'}}>
                        <PlayArrowIcon style={{'fontSize':'50px'}} className="whiter"/><div className="butText">PLAY</div>
                    </button>
                </Link>
                
            </div>
        </div>
    )
}

