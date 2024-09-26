// Add my functions 2024/9/23
let highestStudentNumber = 3; // Since there are initially 3 students

// Function to toggle the visibility of the dropdown textarea
function toggleText(textarea) {
  // Toggle the display property of the table
  if (textarea.style.display === 'none'|| textarea.style.display === '') {
    textarea.style.display = 'table-row';
  }
  else {
    textarea.style.display = 'none';
  }
}
// Function to add the click event listener to each image
function addClickEvent(icon) {
  icon.addEventListener('click', function() {toggleText(icon.parentElement.parentElement.nextElementSibling);});
}

// Function to show or hide delete/edit buttons based on checkbox selection
function toggleButtons() {
  const rows = document.querySelectorAll("#myTable tr"); // Select all rows including the header
  let anySelected = false;

  function setRows(row,index){
    console.log(row)
    console.log(index)
    const checkbox = row.querySelector("input[type='checkbox']");

    // Only handle rows that have checkboxes (skip the header row)
    if (checkbox) {
      const deleteButton = row.querySelector("td:nth-child(9)"); // DELETE button cell
      const editButton = row.querySelector("td:nth-child(10)"); // EDIT button cell

      if (checkbox.checked) {
        // Show the buttons in this row
        deleteButton.style.display = 'table-cell';
        editButton.style.display = 'table-cell';
        row.style.background = "yellow";
        anySelected = true;
      }
      else {
        // Hide the buttons in this row
        deleteButton.style.display = 'none';
        editButton.style.display = 'none';
        row.style.background = "";
      }
    }

  }
  rows.forEach(setRows);

  // Show or hide header columns based on whether any checkboxes are selected
  const deleteHeader = document.querySelector("th:nth-child(9)");
  const editHeader = document.querySelector("th:nth-child(10)");
  const submitButton = document.querySelector("#submitButton");

  if (anySelected) {
    deleteHeader.style.display = 'table-cell';
    editHeader.style.display = 'table-cell';
    submitButton.disabled = false;
    submitButton.classList.add('activeSubmitButton');
  }
  else {
    deleteHeader.style.display = 'none';
    editHeader.style.display = 'none';
    submitButton.disabled = true;
    submitButton.classList.remove('activeSubmitButton');
  }
}

function addChangeEvent(checkbox) {
  checkbox.addEventListener('change', toggleButtons);
}


// Add a new student row with pop-up
function addNewStudent() {
  const table = document.getElementById('myTable');
  // Increment the highest student number
  highestStudentNumber++;

  // Create the new student row
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>
    <input type="checkbox" id="cb${highestStudentNumber}">
    <label for="cb${highestStudentNumber}"></label>
    <br><br>
    <img class="toggleImage" src="down.png" alt="down" width="25px">
    </td>
    <td>Student ${highestStudentNumber}</td>
    <td>Teacher ${highestStudentNumber}</td>
    <td>Approved</td>
    <td>Fall</td>
    <td>TA</td>
    <td>${highestStudentNumber * 1000}</td>
    <td>100%</td>
    <td class="hideColumn"><button onclick="deleteRow(this)">Delete</button></td>
    <td class="hideColumn"><button onclick="editRow(this)">Edit</button></td>
  `;

  // Create the corresponding dropdown textarea
  const newDropDown = document.createElement('tr');
  newDropDown.classList.add('dropDownTextArea');
  newDropDown.innerHTML = `
    <td colspan="8">
      Advisor:<br/><br/>
      Award Details<br/>
      Summer 1-2014(TA)<br/>
      Budget Number: <br/>
      Tuition Number: <br/>
      Comments:<br/><br/><br/>
      Award Status:<br/><br/><br/>
    </td>
  `;

  table.appendChild(newRow); // Append the new student row
  table.appendChild(newDropDown); // Append the corresponding dropdown row

  // Apply interaction effect
  const icon = newRow.querySelector('.toggleImage');
  addClickEvent(icon);
  const checkbox = newRow.querySelector("input[type='checkbox']");
  addChangeEvent(checkbox);

  if (studentExists(highestStudentNumber)) {
    showPopupMessage(`Student ${highestStudentNumber} Record added successfully`);
  } else {
    showPopupMessage(`Failed to add Student ${highestStudentNumber}`);
  }
}

// get 3 dropdown icons
const icons = document.querySelectorAll('.toggleImage');
// Loop through 3 image and call the addClickEvent function
icons.forEach(addClickEvent);
// Add event listeners for 3checkboxes
const checkboxes = document.querySelectorAll("#myTable input[type='checkbox']");
checkboxes.forEach(addChangeEvent);

document.getElementById('addButton').addEventListener('click', addNewStudent);




















// Function to create a pop-up message
function showPopupMessage(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup');

  const messageText = document.createElement('p');
  messageText.textContent = message;
  popup.appendChild(messageText);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = function() {
    closePopup(popup);
  };

  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}

// Function to remove a popup
function closePopup(popup) {
  document.body.removeChild(popup);
}

// Function to check if a student exists
function studentExists(studentNumber) {
  const students = document.querySelectorAll("#myTable td:nth-child(2)"); // Select all student cells
  for (let i = 0; i < students.length; i++) {
    if (students[i].textContent.trim() === `Student ${studentNumber}`) {
      return true;
    }
  }
  return false;
}

// Remove row function with pop-up
function deleteRow(deleteButton) {
  const row = deleteButton.parentElement.parentElement; // Target the row
  const nextRow = row.nextElementSibling; // Get the dropdown textarea (next row)
  const studentCell = row.querySelector('td:nth-child(2)');
  const studentNumber = studentCell ? studentCell.textContent : '';

  if (nextRow && nextRow.classList.contains('dropDownTextArea')) {
    nextRow.remove(); // Remove dropdown textarea
  }

  row.remove(); // Remove the row itself
  toggleButtons()
  showPopupMessage(`${studentNumber} Record deleted successfully`);
}

// Edit row function with pop-up
function editRow(editButton) {
  const row = editButton.parentElement.parentElement;
  const nextRow = row.nextElementSibling;
  const studentCell = row.querySelector('td:nth-child(2)');
  const studentNumber = studentCell ? studentCell.textContent : '';
  const dropdownContent = nextRow.innerHTML;

  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = dropdownContent;

  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.onclick = function() {
    closePopup(popup);
    showPopupMessage(`${studentNumber} data updated successfully`);
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = function() {
    closePopup(popup);
  };

  popup.appendChild(updateButton);
  popup.appendChild(cancelButton);

  document.body.appendChild(popup);
}

// SUBMIT SELECTED AWARDS button pop-up
document.getElementById('submitButton').addEventListener('click', function() {
  showPopupMessage('Successful Submission');
});
