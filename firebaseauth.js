// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPVSP-K3JNHBasYSLdQWAZG__c2rkF28g",
  authDomain: "login-register-form-templ.firebaseapp.com",
  projectId: "login-register-form-templ",
  storageBucket: "login-register-form-templ.appspot.com",
  messagingSenderId: "847240665452",
  appId: "1:847240665452:web:c68bd83e0eb6c06c76fb49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  let messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password // Include password for educational purposes only
      };
      showMessage("Account created successfully", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("error writing document", error);
        });
    })
    .catch((error) => { // Corrected extra parentheses
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') { // Added closing parenthesis
        showMessage('Email address already exists.', 'signUpMessage');
      } else {
        showMessage("Unable to create user", "signUpMessage");
      }
    });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage("login is successful", 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-credential') {
            showMessage('Incorrect Email or Password', 'signInMessage');
        } else {
            showMessage('Account does not exist', 'signInMessage');
        }
    })
});
