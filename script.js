'use strict';

// Get DOM elemrnts
const submitBtn = document.getElementById('submit-btn');
const showPetBtn = document.getElementById('healthy-btn');
const calcBMIBtn = document.getElementById('BMI-btn');

const idInputEl = document.getElementById('input-id');
const nameInputEl = document.getElementById('input-name');
const ageInputEl = document.getElementById('input-age');
const typeInputEl = document.getElementById('input-type');
const weightInputEl = document.getElementById('input-weight');
const lengthInputEl = document.getElementById('input-length');
const colorInputEl = document.getElementById('input-color-1');
const breedInputEl = document.getElementById('input-breed');
const vaccinatedInputEl = document.getElementById('input-vaccinated');
const dewormedInputEl = document.getElementById('input-dewormed');
const sterilizedInputEl = document.getElementById('input-sterilized');

const tableBodyEl = document.getElementById('tbody');

// Initial pet data
const petArr = [
  {
    id: 'P001',
    name: 'Jerry',
    age: 5,
    type: 'Dog',
    weight: 3,
    petLength: 40,
    color: 'green',
    breed: 'Mixed Breed',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date('2022-03-02'),
  },
  {
    id: 'P002',
    name: 'Tom',
    age: 3,
    type: 'Cat',
    weight: 5,
    petLength: 50,
    color: 'red',
    breed: 'Tabby',
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    date: new Date('2022-03-01'),
  },
];

// Event listener for submitting pet data
submitBtn.addEventListener('click', () => {
  // Getting data from input field.
  const data = {
    id: idInputEl.value,
    name: nameInputEl.value,
    age: ageInputEl.value,
    type: typeInputEl.value,
    weight: weightInputEl.value,
    petLength: lengthInputEl.value,
    color: colorInputEl.value,
    breed: breedInputEl.value,
    vaccinated: vaccinatedInputEl.checked,
    dewormed: dewormedInputEl.checked,
    sterilized: sterilizedInputEl.checked,
    date: new Date(),
  };
  console.log(data);

  // Validate and add data to petArr
  const isValidated = validateData(data);

  if (isValidated) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});

// Flag for showing all or healthy pets
let healthyCheck = false;

// Event listener for showing all or healthy pets
showPetBtn.addEventListener('click', () => {
  let healthyPetArr = [];

  // Toggle the flag
  healthyCheck = !healthyCheck;

  // Filter pets based on the flag
  if (healthyCheck) {
    healthyPetArr = petArr.filter(
      (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
    );
  }

  // Show the updated table accordingly
  renderTableData(healthyCheck ? healthyPetArr : petArr);

  // Update the button text based on the flag
  showPetBtn.textContent = healthyCheck ? 'Show All Pet' : 'Show Healthy Pet';
});

// Event listener for calculating pets BMI
calcBMIBtn.addEventListener('click', () => {
  // Loop through the pets array and calculate BMI of each pet
  petArr.forEach((pet, index) => {
    const bmiElement = document.getElementById(`BMI-${index}`);

    if (pet.type === 'Dog') {
      const dogBMI = (pet.weight * 703) / pet.petLength ** 2;
      bmiElement.textContent = dogBMI.toFixed(2);
    } else {
      const catBMI = (pet.weight * 886) / pet.petLength ** 2;
      bmiElement.textContent = catBMI.toFixed(2);
    }
  });
});

// Event listener for deleting a pet
tableBodyEl.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('btn-danger')) {
    const petId = target.dataset.petId;
    deletePet(petId);
  }
});

/////////// FUNCTIONS /////////////

// Validating function
function validateData(data) {
  let validated = true;

  //  Check if ID is unique
  petArr.forEach((pet) => {
    if (data.id === pet.id) {
      alert('ID must be unique!');
      validated = false;
    }
  });

  // Check input field
  if (!data.id.trim()) {
    alert('Fill in the Pet ID, please!');
    validated = false;
  }

  if (!data.name.trim()) {
    alert('Fill in the Pet Name, please!');
    validated = false;
  }

  if (data.age > 15 || data.age < 1 || !data.age) {
    alert('Age must be between 1 and 15!');
    validated = false;
  }

  if (data.type === 'Select Type') {
    alert('Please select Type!');
    validated = false;
  }

  if (data.weight > 15 || data.weight < 1 || !data.weight) {
    alert('Weight must be between 1 and 15!');
    validated = false;
  }

  if (data.petLength > 100 || data.petLength < 1 || !data.petLength) {
    alert('Length must be between 1 and 100!');
    validated = false;
  }

  if (data.breed === 'Select Breed') {
    alert('Please select Breed!');
    validated = false;
  }

  return validated;
}

// Show the pet data on the HTML table
function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');

    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].petLength} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td><i class="bi  ${
      petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td><i class="bi  ${
      petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td id="BMI-${i}">?</td>
    <td>${petArr[i].date.getDate()}/${petArr[i].date.getMonth() + 1}/${petArr[
      i
    ].date.getFullYear()}</td>
    <td>
      <button type="button" class="btn btn-danger" data-pet-id = "${
        petArr[i].id
      }" >Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

// Clear the input fields
function clearInput() {
  idInputEl.value = '';
  nameInputEl.value = '';
  ageInputEl.value = '';
  typeInputEl.value = 'Select Type';
  weightInputEl.value = '';
  lengthInputEl.value = '';
  colorInputEl.value = '#000000';
  breedInputEl.value = 'Select Breed';
  vaccinatedInputEl.checked = false;
  dewormedInputEl.checked = false;
  sterilizedInputEl.checked = false;
}

// Delete a pet from the pet array
function deletePet(petId) {
  if (confirm('Are you sure')) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
}
