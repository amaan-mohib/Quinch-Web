import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Chart from "chart.js";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CloseIcon from "@material-ui/icons/Close";
import BarChartIcon from "@material-ui/icons/BarChart";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { getQues, checkAuth, getHighScore } from "./index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6d6d6d",
      main: "#424242",
      dark: "#1b1b1b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#8e8e8e",
      main: "#616161",
      dark: "#373737",
      contrastText: "#fff",
    },
  },
});

const darktheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

var i = 1;
var score = 0;

export default function Game() {
  const [signedIn, setSignedIn] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [isDisabled3, setIsDisabled3] = useState(false);
  const [isDisabled4, setIsDisabled4] = useState(false);
  let history = useHistory();

  const handleClickOpen = () => {
    console.log(checkAuth());
    if (checkAuth()) {
      setSignedIn(true);
    } else {
      setSignedOut(true);
    }
  };
  const handleClose = () => {
    if (signedIn) {
      setSignedIn(false);
    } else if (signedOut) {
      setSignedOut(false);
    }
  };

  const handleBarOpen = () => {
    setOpen(true);
  };
  const handleBarClose = () => {
    setOpen(false);
  };
  const handleSearchOpen = () => {
    setSearch(true);
  };
  const handleSearchClose = () => {
    setSearch(false);
  };

  useEffect(() => {
    const timerDiv = document.getElementById("timerDiv");
    const scoreDiv = document.getElementById("scoreDiv");
    const l2 = document.getElementById("l2");
    const l3 = document.getElementById("l3");
    const l4 = document.getElementById("l4");
    const firstHalf = document.getElementById("firstHalf");
    const secondHalf = document.getElementById("secondHalf");
    const logoText = document.getElementById("logo");
    l2.style.display = "none";
    l3.style.display = "none";
    l4.style.display = "none";
    firstHalf.style.width = "100%";
    secondHalf.style.width = "0%";
    timerDiv.style.display = "flex";
    scoreDiv.style.display = "flex";
    logoText.style.display = "none";
    score = 0;
    setScore(score);
    getQues(`ques${i}`);
    setIsDisabled(false);
    setIsDisabled2(false);
    setIsDisabled3(false);
    setIsDisabled4(false);
    timer(10, history);
    getHighScore();
    console.log(i);
    console.log(score);
    return () => {
      i = 1;
      clearInterval(countDown);

      timerDiv.style.display = "none";
      scoreDiv.style.display = "none";
      l2.style.display = "none";
      l3.style.display = "none";
      l4.style.display = "none";
      logoText.style.display = "inline-block";
      firstHalf.style.width = "100%";
      secondHalf.style.width = "0%";
      console.log(score);
    };
  }, []);

  return (
    <div id="game">
      <div id="quesBox" className="quesBox">
        <div className="progress">
          <span
            id="progress"
            style={{ width: "100%", transitionDuration: "0.4s" }}></span>
          <div>
            <ThemeProvider theme={theme}>
              <Fab color="primary" size="small" onClick={handleClickOpen}>
                <CloseIcon titleAccess="Quit" className="whiter" />
              </Fab>
            </ThemeProvider>

            {/* signed in dialog */}
            <ThemeProvider theme={darktheme}>
              <Dialog
                open={signedIn}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to quit?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    On quitting your highscores will be saved but the game will
                    end.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Link to="/end" style={{ textDecoration: "none" }}>
                    <Button
                      onClick={() => {
                        i = 1;
                        clearInterval(countDown);
                      }}
                      autoFocus>
                      OK
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
            </ThemeProvider>

            <ThemeProvider theme={darktheme}>
              {/* signed out dialog */}
              <Dialog
                open={signedOut}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to quit?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Sign in to save your highscores or quit the game without
                    saving.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/end" style={{ textDecoration: "none" }}>
                    <Button
                      onClick={() => {
                        handleClose();
                        clearInterval(countDown);
                        i = 1;
                      }}>
                      Quit
                    </Button>
                  </Link>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      clearInterval(countDown);
                      window.location = "login.html";
                      i = 1;
                    }}
                    autoFocus>
                    Sign In
                  </Button>
                </DialogActions>
              </Dialog>
            </ThemeProvider>

            {/* Bar chart */}
            <ThemeProvider theme={darktheme}>
              <Dialog
                open={open}
                onClose={handleBarClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Option Charts"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <OptionChart color="#00c853" />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleBarClose}>Got it</Button>
                </DialogActions>
              </Dialog>
            </ThemeProvider>

            {/* Search */}
            <ThemeProvider theme={darktheme}>
              <Dialog
                open={search}
                onClose={handleSearchClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Search the web"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Google and DuckDuckGo do not support embedding, so the
                    search results will open in new tab.
                    <Search></Search>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleSearchClose();
                      restartTime(history);
                    }}>
                    Restart time (-5 points)
                  </Button>
                  <Button onClick={handleSearchClose}>Got it</Button>
                </DialogActions>
              </Dialog>
            </ThemeProvider>
          </div>
        </div>
        <div className="lifeline">
          <div id="firstHalf">
            <Lifeline
              id="l1"
              onClick={() => {
                setIsDisabled(true);
                handleBarOpen();
                console.log(isDisabled);
              }}
              disabled={isDisabled}
              option={<BarChartIcon className="iconSpacer2" />}
            />
            <Lifeline
              id="l2"
              option="50 : 50"
              onClick={() => {
                setIsDisabled2(true);
                fiftyfifty();
                console.log(isDisabled2);
              }}
              disabled={isDisabled2}
            />
          </div>
          <div id="secondHalf">
            <Lifeline
              id="l3"
              onClick={() => {
                setIsDisabled3(true);
                handleSearchOpen();
                console.log(isDisabled3);
              }}
              disabled={isDisabled3}
              option={<SearchIcon className="iconSpacer2" />}
            />
            <Lifeline
              id="l4"
              onClick={() => {
                setIsDisabled4(true);
                flipQues(history);
                console.log(isDisabled4);
              }}
              disabled={isDisabled4}
              option={<AutorenewIcon className="iconSpacer2" />}
            />
          </div>
        </div>
        <div id="ques" className="ques">
          Loading...
        </div>
        <div className="options">
          <div>
            <Option id="o1" option="Loading" />
            <Option id="o2" option="Loading" />
          </div>
          <div>
            <Option id="o3" option="Loading" />
            <Option id="o4" option="Loading" />
          </div>
        </div>
        <div></div>
        <div id="hiddenDiv" style={{ display: "none" }}></div>
      </div>
    </div>
  );
}

function getChartData() {
  const o1 = document.getElementById("o1");
  const o2 = document.getElementById("o2");
  const o3 = document.getElementById("o3");
  const o4 = document.getElementById("o4");
  const hiddenDiv = document.getElementById("hiddenDiv");
  //const optList = [o1, o2, o3, o4];
  const optListHTML = [o1.innerHTML, o2.innerHTML, o3.innerHTML, o4.innerHTML];
  const value = [2, 1.5, 0.5];
  const values = [];
  for (var j = 0; j < optListHTML.length; j++) {
    var randomIndex = Math.floor(Math.random() * value.length);
    if (optListHTML[j] === hiddenDiv.innerHTML) {
      values.push(6);
    } else {
      values.push(value[randomIndex]);
      const index = value.indexOf(value[randomIndex]);
      if (index > -1) {
        value.splice(index, 1);
      }
    }
  }
  return {
    labels: optListHTML,
    data: values,
  };
}

function fiftyfifty() {
  setTimeout(() => {
    const o1 = document.getElementById("o1");
    const o2 = document.getElementById("o2");
    const o3 = document.getElementById("o3");
    const o4 = document.getElementById("o4");
    const optList = [o1, o2, o3, o4];
    const hiddenDiv = document.getElementById("hiddenDiv");

    const wrongOptList = [];
    for (var j = 0; j < optList.length; j++) {
      if (optList[j].innerHTML !== hiddenDiv.innerHTML) {
        wrongOptList.push(optList[j]);
      }
    }
    for (j = 0; j < 2; j++) {
      var random = Math.floor(Math.random() * wrongOptList.length);
      wrongOptList[random].innerHTML = "&nbsp;";
      const index = wrongOptList.indexOf(wrongOptList[random]);
      if (index > -1) {
        wrongOptList.splice(index, 1);
      }
    }
  }, 100);
}

var countDown;

function timer(time, history) {
  var seconds = time;
  const constSec = seconds;
  countDown = setInterval(() => {
    const timeSpan = document.getElementById("timer");
    const progress = document.getElementById("progress");
    timeSpan.textContent = seconds < 10 ? "0" + seconds : seconds;
    progress.style.width = `${(seconds * 10) / (constSec / 10)}%`;
    seconds--;
    if (seconds < 0) {
      clearInterval(countDown);
      if (history) {
        i = 1;
        setTimeout(() => {
          history.push("/end");
          const timeUp = document.getElementById("timeup");
          timeUp.style.display = "block";
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

function answerChecker(option, history) {
  const hiddenDiv = document.getElementById("hiddenDiv");
  const checked = option.innerHTML === hiddenDiv.innerHTML;
  const l2 = document.getElementById("l2");
  const l3 = document.getElementById("l3");
  const l4 = document.getElementById("l4");
  const firstHalf = document.getElementById("firstHalf");
  const secondHalf = document.getElementById("secondHalf");
  var x = window.matchMedia("(max-width: 720px)");

  if (checked) {
    //seti(i=i+1);
    score += 10;
    setScore(score);
    i = i + 1;
    //window.location = "/game";
    console.log(i);
    if (i < 11) {
      getQues(`ques${i}`);
    }
    if (i === 11 || i === 12) {
      i = 1;
      clearInterval(countDown);
      setTimeout(() => {
        history.push("/end");
        const congo = document.getElementById("congo");
        congo.style.display = "block";
      }, 1000);
    }
    clearInterval(countDown);
    setTimeout(() => {
      if (i <= 3) {
        timer(10, history);
      }
      if (i >= 4 && i <= 5) {
        timer(20, history);
        l2.style.display = "inline-block";
      }
      if (i >= 6 && i <= 7) {
        timer(30, history);
        if (x.matches) {
          firstHalf.style.width = "100%";
          secondHalf.style.width = "100%";
        } else {
          firstHalf.style.width = "62.5%";
          secondHalf.style.width = "37.5%";
        }

        l3.style.display = "flex";
      }
      if (i >= 8 && i <= 9) {
        timer(40, history);
      }
      if (i >= 10 && i <= 11) {
        timer(60, history);
        if (x.matches) {
          firstHalf.style.width = "100%";
          secondHalf.style.width = "100%";
        } else {
          firstHalf.style.width = "50%";
          secondHalf.style.width = "50%";
        }
        l4.style.display = "flex";
      }
    }, 100);
  } else {
    return;
  }
}

function boolanswerChecker(option) {
  const hiddenDiv = document.getElementById("hiddenDiv");
  const checked = option.innerHTML === hiddenDiv.innerHTML;
  if (checked) {
    return true;
  } else {
    return false;
  }
}
function setScore(scores) {
  const scoreSpan = document.getElementById("score");
  scoreSpan.innerHTML = `${scores}`;
}

export function Lifeline(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    score -= 5;
    setScore(score);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <button
        id={props.id}
        onClick={() => {
          props.onClick();
          handleClick();
        }}
        disabled={props.disabled}
        className="lifelineBtn">
        {props.option}
      </button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error">
          -5 points!
        </Alert>
      </Snackbar>
    </>
  );
}

function Option(props) {
  const [open, setOpen] = useState(false);
  const [wrongOpen, setWrongOpen] = useState(false);

  let history = useHistory();
  const wrongClick = (ifCorrect) => {
    if (!ifCorrect) {
      setWrongOpen(true);
      i = 1;
      clearInterval(countDown);
      setTimeout(() => {
        history.push("/end");
      }, 1000);
    }
  };
  const handleClick = (ifCorrect) => {
    if (ifCorrect) {
      setOpen(true);
    } else {
      setWrongOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (open) {
      setOpen(false);
    }
    if (wrongOpen) {
      setWrongOpen(false);
    }
  };
  return (
    <>
      <button
        id={props.id}
        className="gameBtn"
        onClick={() => {
          handleClick(
            boolanswerChecker(document.getElementById(`${props.id}`))
          );
          answerChecker(document.getElementById(`${props.id}`), history);
          wrongClick(boolanswerChecker(document.getElementById(`${props.id}`)));
        }}>
        {props.option}
      </button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success">
          Correct Answer!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={wrongOpen}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error">
          Wrong Answer!
        </Alert>
      </Snackbar>
    </>
  );
}

export function Play() {
  return (
    <div id="game">
      <div id="play">
        <Link to="/game">
          <button
            id="playBtn"
            className="gameBtn"
            style={{ fontWeight: "700", fontSize: "50px" }}>
            <PlayArrowIcon style={{ fontSize: "50px" }} className="whiter" />
            <div className="butText">PLAY</div>
          </button>
        </Link>
      </div>
    </div>
  );
}

function OptionChart(props) {
  const canvasRef = useRef();

  useEffect(() => {
    var values = getChartData();
    Chart.defaults.global.defaultFontColor = "white";
    var barChart = new Chart(canvasRef.current, {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10,
              },
            },
          ],
        },
      },
      data: {
        // labels: props.data.map(d => d.label),
        // datasets: [{
        //     label: props.title,
        //     data: props.data.map(d => d.value),
        //     backgroundColor: props.color
        // }]
        labels: values.labels,
        datasets: [
          {
            label: "(*10)% of votes",
            data: values.data,
            backgroundColor: props.color,
          },
        ],
      },
    });
    // barChart.data.labels = props.data.map(d => d.label);
    // barChart.data.datasets[0].data = props.data.map(d => d.value);
    // barChart.update();
  }, []);
  return <canvas width="300" height="300" ref={canvasRef}></canvas>;
}

function restartTime(history) {
  score -= 5;
  setScore(score);
  clearInterval(countDown);
  setTimeout(() => {
    if (i <= 3) {
      timer(10, history);
    }
    if (i >= 4 && i <= 5) {
      timer(20, history);
    }
    if (i >= 6 && i <= 7) {
      timer(30, history);
    }
    if (i >= 8 && i <= 9) {
      timer(40, history);
    }
    if (i >= 10 && i <= 11) {
      timer(60, history);
    }
  }, 100);
}

function Search() {
  const ques = document.getElementById("ques");
  let bingUrl = `https://www.bing.com/search?q=${ques.innerHTML}`;
  let googleUrl = `https://www.google.com/search?q=${ques.innerHTML}`;
  let ddgUrl = `https://www.duckduckgo.com/?q=${ques.innerHTML}`;
  return (
    <div className="searchBtns">
      <br />
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          window.open(googleUrl);
        }}>
        Google
      </Button>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          window.open(bingUrl);
        }}>
        Bing
      </Button>
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          window.open(ddgUrl);
        }}>
        Duck Duck Go
      </Button>
    </div>
  );
}

function flipQues(history) {
  i = i + 1;
  getQues(`ques${i}`);
  clearInterval(countDown);
  setTimeout(() => {
    timer(60, history);
  }, 100);
}
