import { addDoc, collection, db } from '../firebaseConfig.js';

const companyName = document.getElementById('companyName');
const designation = document.getElementById('designation');
const startingSalary = document.getElementById('startingSalary');
const endingSalary = document.getElementById('endingSalary');
const jobType = document.getElementById('jobType');
const city = document.getElementById('city');
const country = document.getElementById('country');
const postBtn = document.getElementById('postBtn');

postBtn.addEventListener('click', postAJobHandler);

async function postAJobHandler() {
  console.log('postAJobHandler is working properly');
  if (
    !companyName.value ||
    !designation.value ||
    !startingSalary.value ||
    !endingSalary.value ||
    !jobType.value ||
    !city.value ||
    !country.value
  ) {
    return alert('All fields are required');
  }
  const userAdded = await addDoc(collection(db, 'posts'), {
    companyName: companyName.value,
    designation: designation.value,
    startingSalary: startingSalary.value,
    endingSalary: endingSalary.value,
    jobType: jobType.value,
    city: city.value,
    country: country.value,
  });

  alert('Post added successfully, moving to jobs page, so you can have a look');
  window.location.href = '../jobs/jobs.html';
}
