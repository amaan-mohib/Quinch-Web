console.log(firebase);
const signOutBtn = document.getElementById('signOutBtn');
const signInEmail = document.getElementById('signInEmail');
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const userDetails = document.getElementById('userDetails');

signInEmail.onclick = () => window.open('login.html');

const auth = firebase.auth();

//Sign Out
signOutBtn.onclick = () => auth.signOut();


auth.onAuthStateChanged(user =>{
    if(user) {
        //signed in
        whenSignedIn.style.display = 'flex';
        whenSignedOut.style.display = 'none';
        //userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
        userDetails.innerHTML = `<img class="pfp" src="${user.photoURL}"/>`;
    } else {
        whenSignedIn.style.display = 'none';
        whenSignedOut.style.display = 'flex';
        userDetails.innerHTML = '';
    }
});