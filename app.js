import {
  auth,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  db,
} from './firebaseConfig.js';

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cPassword = document.getElementById('cPassword');
const signupBtn = document.getElementById('signupBtn');

signupBtn.addEventListener('click', signUpHandler);

async function signUpHandler() {
  console.log(
    firstName.value,
    lastName.value,
    userName.value,
    email.value,
    password.value,
    cPassword.value,
    'signup handler is working'
  );
  if (
    !email.value ||
    !firstName.value ||
    !lastName.value ||
    !userName.value ||
    !password.value
  ) {
    return alert('All fields are required');
  }
  if (password.value !== cPassword.value) {
    return alert('sorry your password and confirm password are not same');
  }
  if (password.value.length < 8) {
    return alert('password length should be minimum 8 characters');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    if (userCredential) {
      console.log(userCredential.user.uid);

      const userAdded = await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          firstName: firstName.value,
          lastName: lastName.value,
          userName: userName.value,
          email: email.value,
          recruiter: false,
        }
      );

      alert('User is registered successfully, diverting you to the login page');
      setTimeout(() => {
        window.location.href = './login/login.html';
      }, 2000);
    } else {
      console.log('kisi wajah sey register nai hosaka');
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode, '==>>>errorCode');
    console.log(errorMessage, '==>>>errorMessage');
  }
}
