import {
  auth,
  onAuthStateChanged,
  doc,
  db,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
} from '../firebaseConfig.js';

const whoIam = document.getElementById('whoIam');
const userName = document.getElementById('userName');
const jobPost = document.getElementById('jobPost');
const jobPostArea = document.getElementById('jobPostArea');

jobPost.style.display = 'none';

whoIam.addEventListener('click', switchToRecruiterOrCandidateHandler);

getSignedInUser();
getAllJobs();

let loggedInUserId;
let recruiter;

async function getSignedInUser() {
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      console.log(uid);

      loggedInUserId = uid;

      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());

        const { userName: userNameFromDB, recruiter: recruiterFromDB } =
          docSnap.data();

        recruiter = recruiterFromDB;

        userName.innerText = userNameFromDB;
        whoIam.innerText = `I am ${recruiter ? 'recruiter' : 'candidate'}`;

        jobPost.style.display = `${recruiter ? 'block' : 'none'}`;
        // if (recruiter) {
        //   jobPost.style.display = 'block';
        // } else {
        //   jobPost.style.display = 'none';
        // }
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }

      // ...
    } else {
      // User is signed out
      // ...
      alert('No user is signed In');
      window.location.href = '../index.html';
    }
  });
}

async function switchToRecruiterOrCandidateHandler() {
  console.log('switchToRecruiterOrCandidateHandler working');
  const userDetails = doc(db, 'users', loggedInUserId);

  // Set the "capital" field of the city 'DC'
  await updateDoc(userDetails, {
    recruiter: !recruiter,
  });

  getSignedInUser();
}

async function getAllJobs() {
  console.log('getting all jobs');
  const q = query(collection(db, 'posts'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    // const postDetails = doc.data();
    // console.log(postDetails.country, '==>>postDetails');
    const {
      country,
      city,
      companyName,
      designation,
      endingSalary,
      startingSalary,
      jobType,
    } = doc.data();

    const content = `
        <div class="">
          <div class="">
            <p class="">${companyName}</p>
            <p class="">${designation}</p>
            <p class="">Rs${startingSalary} - Rs${endingSalary}</p>
          </div>
          <div class="">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
        </div>
        <div class="">
          <p class="">
            A Bachelor’s Degree from an accredited college or university with a
            major in computer science or a closely related field, including
            course work in both applications programming and systems analysis.
          </p>
        </div>
        <div class="">
          <button class="" tabindex="0" type="button">
            ${jobType}<span class=""></span>
          </button>
          <p class="">${city}, ${country}</p>
        </div>
        <div class="">
          <p class="">1 day ago</p>
        </div>
    `;

    const myPostElement = document.createElement('div');

    myPostElement.innerHTML = content;

    myPostElement.style =
      'border: 1px solid black; border-radius: 15px; padding: 50px';

    jobPostArea.appendChild(myPostElement);
  });
}
