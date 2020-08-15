import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
//import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import BarChartIcon from '@material-ui/icons/BarChart';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {getQues, checkAuth} from './index';
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

const darktheme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

var i =1;
var score=0;

export default function Game(){
    
    const [signedIn, setSignedIn] = useState(false);
    const [signedOut, setSignedOut] = useState(false);
    let history = useHistory();
    
    const handleClickOpen = () => {
        console.log(checkAuth());
        if(checkAuth()){
            setSignedIn(true);
        } else {
            setSignedOut(true);
        }
    }
    const handleClose = () => {
        if(signedIn){
            setSignedIn(false);
        }
        else if(signedOut){
            setSignedOut(false);
        }
    }

    useEffect(() => {
        const timerDiv = document.getElementById("timerDiv");
        const scoreDiv = document.getElementById("scoreDiv");
        timerDiv.style.display = 'flex';
        scoreDiv.style.display = 'flex';
        score=0;
        setScore(score);
        getQues(`ques${i}`);
        //timer(10, history);                                        //Remember BSDK
        
        console.log(i);
        console.log(score)
        return() => {
            //score=0;
            //setScore(score);
            clearInterval(countDown);
            timerDiv.style.display = 'none';
            scoreDiv.style.display = 'none';
            console.log(score);
        }
    },[]);
    
    return(
        <div id="game">
            <div id="quesBox" className="quesBox">
                
                <div className="progress">
                    <span id="progress" style={{'width':'100%'}}></span>
                    <div>
                            <ThemeProvider theme={theme}>
                                <Fab color="primary" size="small" onClick={handleClickOpen}>
                                    <CloseIcon titleAccess="Quit" className="whiter"/>
                                </Fab>
                            </ThemeProvider>
                        
                        {/* signed in dialog */}
                        <ThemeProvider theme={darktheme}>
                        <Dialog
                            open={signedIn}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Do you want to quit?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    On quitting your highscores will be saved but the game will end.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Link to="/end" style={{'textDecoration':'none'}}>
                                <Button onClick={() => {i=1; clearInterval(countDown);}} autoFocus>
                                    OK
                                </Button></Link>
                            </DialogActions>
                        </Dialog></ThemeProvider>

                        <ThemeProvider theme={darktheme}>
                        {/* signed out dialog */}
                        <Dialog
                            open={signedOut}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Do you want to quit?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Sign in to save your highscores or quit the game without saving.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Link to="/end" style={{'textDecoration':'none'}}>
                                <Button onClick={() => {handleClose(); clearInterval(countDown); window.location ="/end"; i=1;}}>
                                    Quit
                                </Button></Link>
                                <Button variant="outlined" onClick={() => {clearInterval(countDown); window.location = "login.html"; i=1; }} autoFocus>
                                    Sign In
                                </Button>
                            </DialogActions>
                        </Dialog></ThemeProvider>
                        
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

var countDown;

function timer(time, history){
    var seconds = time;
    const constSec = seconds;
    countDown = setInterval(() => {
        
        const timeSpan = document.getElementById("timer");
        const progress = document.getElementById("progress");
        timeSpan.textContent = seconds<10 ? "0"+seconds : seconds;
        progress.style.width = `${(seconds*10)/(constSec/10)}%`;
        seconds--;
        if(seconds < 0){
            clearInterval(countDown);
            if(history){
                i=1;
                setTimeout(() => {
                    history.push("/end");
                    const timeUp =document.getElementById("timeup");
                    timeUp.style.display = 'block';
                }, 1000);
                
            }
            
        }
    }, 1000);
}

// function clearTimer(time){
//     console.log(time);
//     const timeSpan = document.getElementById("timer");
//     const progress = document.getElementById("progress");
//     timeSpan.textContent = 10;
//     progress.style.width = "100%";
//     clearInterval(time);
// }


function answerChecker(option, history){
    const hiddenDiv = document.getElementById("hiddenDiv");
    const checked = option.innerHTML === hiddenDiv.innerHTML;
    if (checked){
        //seti(i=i+1);
        score+=10;
        setScore(score);
        i=i+1;
        //window.location = "/game";
        console.log(i);
        if(i<11){getQues(`ques${i}`);}
        if(i===11 || i===12){
            i=1;
            clearInterval(countDown);
            setTimeout(() => {
                history.push("/end");
                const congo =document.getElementById("congo");
                congo.style.display = 'block';
            }, 1000);
            
        }
        clearInterval(countDown);
        setTimeout(() => {
            if(i<=3){timer(10, history);}
            if(i>=4 && i<=5){timer(20, history);}
            if(i>=6 && i<=7){timer(30, history);}
            if(i>=8 && i<=9){timer(40, history);}
            if(i>=10 && i<=11){timer(60, history);}
        }, 100);
        
    }
    else {
        return;
    }
}

function boolanswerChecker(option){
    const hiddenDiv = document.getElementById("hiddenDiv");
    const checked = option.innerHTML === hiddenDiv.innerHTML;
    if (checked){
        return true;
    }
    else {
        return false;
    }
}
function setScore(scores){
    const scoreSpan = document.getElementById("score");
    scoreSpan.innerHTML=`${scores}`;
}

export function Lifeline(props){
    return(
        <button id={props.id} className="lifelineBtn">
            {props.option}
        </button>
    );
}

function Option(props){
    const [open, setOpen] = useState(false);
    const [wrongOpen, setWrongOpen] = useState(false);
    
    let history = useHistory();
    const wrongClick = (ifCorrect) => {
        if(!ifCorrect){
            setWrongOpen(true);
            i=1;
            clearInterval(countDown);
            setTimeout(() => {
                history.push("/end");
            }, 1000);
            
        }
    }
    const handleClick = (ifCorrect) => {
        if(ifCorrect){
            setOpen(true);
        } else{
            setWrongOpen(true);
        }
      };
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    if(open){setOpen(false);}
    if(wrongOpen){setWrongOpen(false);}
    };
    return(
        <>
        <button id={props.id} className="gameBtn" onClick={() => {handleClick(boolanswerChecker(document.getElementById(`${props.id}`))); answerChecker(document.getElementById(`${props.id}`), history); wrongClick(boolanswerChecker(document.getElementById(`${props.id}`)));}}>
            {props.option}
        </button>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity="success">
            Correct Answer!
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={wrongOpen} autoHideDuration={2000} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity="error">
            Wrong Answer!
            </Alert>
        </Snackbar>
        </>
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

