import { signInWithEmailAndPassword, auth } from '../firebaseConfig.js';

const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', loginHandler);

async function loginHandler() {
  console.log(email.value, password.value, 'login handler working properly');

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    if (user) {
      alert('User logged in successfully, diverting to jobs page');
      window.location.href = '../jobs/jobs.html';
    } else {
      console.log('koi panga aaya hai , login main');
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);

    if (errorCode === 'auth/wrong-password' || 'auth/user-not-found')
      alert(errorMessage);
  }
}
