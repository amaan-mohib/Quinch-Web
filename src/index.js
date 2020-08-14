import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Navbar from "./navbar";
import Game, {Play} from "./Game";
import Help from "./help";
import Settings from "./settings";
import Nsi from "./nsi";
import GuestPfp from "./assets/img_avatar.png"
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/analytics");

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div className="game">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Play}/>
            <Route path="/game" component={Game}/>
            <Route path="/help" component={Help}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/signin" component={Nsi}/>
          </Switch>
        </div>
      </Router>

    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA1QTmGxpPWp-GAB-K-Fs1e12FZC7dZ4Xc",
  authDomain: "quinch-ef1b2.firebaseapp.com",
  databaseURL: "https://quinch-ef1b2.firebaseio.com",
  projectId: "quinch-ef1b2",
  storageBucket: "quinch-ef1b2.appspot.com",
  messagingSenderId: "469869610153",
  appId: "1:469869610153:web:4e082c615eba1cb343d5b8",
  measurementId: "G-1JNCXK6QW3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

console.log(firebase);

var db = firebase.firestore();

//adding (temporary)
// export function addData(){
//   db.collection("ques9").doc("9a").set({
//     ques: "The first death anniversary day of Sri Rajiv Gandhi was observed as the",
//     correct: "Anti-Terrorism Day",
//     options: ["Anti-Terrorism Day","National Integration Day","Peace and Love Day","Secularism Day"]
//   });
// }

//Getting question from firestore
export function getQues(question) {
  const ques = document.getElementById("ques");
  const hiddenDiv = document.getElementById("hiddenDiv");
  const getCollection = db.collection(question);
  
  
  getCollection.get().then(function(querySnapshot){
    //Array of quesID
    const quesID = querySnapshot.docs.map(doc => {return doc.id});
    var randomIndex = Math.floor(Math.random() * quesID.length);
    console.log(quesID[randomIndex]);
    
    var docRef = getCollection.doc(`${quesID[randomIndex]}`);

    docRef.get().then(function(doc){
      if(doc.exists) {
        console.log(doc.data().ques);
        console.log(doc.data().options);
        const options = doc.data().options;
        const correct = doc.data().correct;
        randomizeOptions(options);
        ques.innerHTML = `${doc.data().ques}`;
        hiddenDiv.innerHTML = `${correct}`;
      } else{
        console.log("No such data");
      }
    }).catch(function(error){
      console.log(error);
    });
  });
  
}

function randomizeOptions(options){
  var n = options.length;
  const o1 = document.getElementById("o1");
  const o2 = document.getElementById("o2");
  const o3 = document.getElementById("o3");
  const o4 = document.getElementById("o4");
  const optList = [o1,o2,o3,o4];
  for(var i = 0; i < n; i++) {
    var randomIndex = Math.floor(Math.random() * options.length);
    // if(i===0) {o1.innerHTML = `${options[randomIndex]}`;}
    // if(i===1) {o2.innerHTML = `${options[randomIndex]}`;}
    // if(i===2) {o3.innerHTML = `${options[randomIndex]}`;}
    // if(i===3) {o4.innerHTML = `${options[randomIndex]}`;}
    optList[i].innerHTML = `${options[randomIndex]}`;
    const index = options.indexOf(options[randomIndex]);
    if (index > -1) {
      options.splice(index, 1);
    }
  }
}


      //const signOutBtn = document.querySelector("signOut");
      const signInEmail = document.getElementById('signInEmail');
      const whenSignedIn = document.getElementById('whenSignedIn');
      const whenSignedOut = document.getElementById('whenSignedOut');
      //const userDetails = document.getElementById('userDetails');
      
      signInEmail.onclick = () => window.open('login.html');

      const auth = firebase.auth();

      export function userName(){
        const greeting = document.getElementById('greeting');
        
        auth.onAuthStateChanged(user =>{
          if(user) {
            if(user.displayName !== null) {
              var greetingHTML = greeting.innerHTML = `${user.displayName}`;
            }
            else {
              var greetingHTML = greeting.innerHTML = `Guest`;
            }
            return greetingHTML; 
          }
        });
      }

      export function userDetail(){
        const userDetails = document.getElementById('userDetails');
        auth.onAuthStateChanged(user =>{
          if(user) {
            if(user.photoURL !== null){
              var userHTML = userDetails.innerHTML = `<img alt="${user.displayName}" title="${user.displayName}" class="pfp" src="${user.photoURL}"/>`;
            }
            else{
              var userHTML = userDetails.innerHTML = `<img alt="Guest" title="Guest"  class="pfp" src="${GuestPfp}"/>`;
            }
            return userHTML; 
          }
        });
      }

      export function getuserName(){
        const greeting = document.getElementById('userName');
        
        const user = auth.currentUser;
          if(user) {
            if(user.displayName !== null) {
              var greetingHTML = greeting.innerHTML = `${user.displayName}`;
            }
            else {
              var greetingHTML = greeting.innerHTML = `Guest`;
            }
            return greetingHTML; 
          }
        
      }

      export function userImg(){
        const userDetails = document.getElementById('userImg');
        let user = auth.currentUser;
          if(user) {
            if(user.photoURL !== null){
              var userHTML = userDetails.innerHTML = `<img alt="${user.displayName}" title="${user.displayName}" class="pfp-large" src="${user.photoURL}"/>`;
            }
            else{
              var userHTML = userDetails.innerHTML = `<img alt="Guest" title="Guest"  class="pfp-large" src="${GuestPfp}"/><div>Please sign in using<br>Google or Facebook<br>to have a profile picture.</div>`;
            }
            return userHTML; 
          }
        
      }

      export function deleteUser(){
        var user = auth.currentUser;
        if(user){
          user.delete().then(function() {
            //User deleted
            window.location = "/";
          }).catch(function(error){
            console.log(error);
          });
        }
        else{
          alert('Let the authentication process complete');
        }
      }

      //Sign Out
      export function signOut(){
        // const signOutBtn = document.getElementById('signOutBtn');
        // signOutBtn.onclick = () => 
        auth.signOut();
        window.location = "/";
      }

      auth.onAuthStateChanged(user =>{
        if(user) {
            //signed in
            whenSignedIn.style.display = 'flex';
            whenSignedOut.style.display = 'none';
            //userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
            //userDetails.innerHTML = `<img class="pfp" src="${user.photoURL}"/>`;
        } else {
            whenSignedIn.style.display = 'none';
            whenSignedOut.style.display = 'flex';
            //userDetails.innerHTML = '';
        }
      });
