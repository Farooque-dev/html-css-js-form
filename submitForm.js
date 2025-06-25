let employeeData = [];
let editingIndex = null;

function validateForm() {
  let valid = true;

  const firstName = document.getElementById("fname").value.trim();
  const lastName = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;
  const genderList = document.getElementsByName("gender");
  const coursesList = document.getElementsByName("courses");

  resetError();

  if (firstName === "") {
    setError("firstNameError", "First name cannot be empty.");
    valid = false;
  } else if (!isValidName(firstName)) {
    setError("firstNameError", "First name must contain letters only.");
    valid = false;
  }

  if (lastName === "") {
    setError("lastNameError", "Last name cannot be empty.");
    valid = false;
  } else if (!isValidName(lastName)) {
    setError("lastNameError", "Last name must contain letters only.");
    valid = false;
  }

  if (email === "") {
    setError("emailError", "Email cannot be empty.");
    valid = false;
  }

  if (!city || city === "") {
    setError("cityError", "Please select a city.");
    valid = false;
  }

  let gender = null;
  for (let i = 0; i < genderList.length; i++) {
    if (genderList[i].checked) gender = genderList[i].value;
  }
  if (!gender) {
    setError("genderError", "Please select Gender.");
    valid = false;
  }

  const courses = [];
  for (let i = 0; i < coursesList.length; i++) {
    if (coursesList[i].checked) courses.push(coursesList[i].value);
  }
  if (courses.length === 0) {
    setError("coursesError", "Select at least one course.");
    valid = false;
  }

  return {
    valid,
    data: { firstName, lastName, email, city, gender, courses },
  };
}

function isValidName(name) {
  if (!name || name.trim() === "") return false;
  if (name.includes(" ")) return false;
  for (let i = 0; i < name.length; i++) {
    const c = name[i];
    if (
      !(
        (c >= "A" && c <= "Z") ||
        (c >= "a" && c <= "z") ||
        c === "-" ||
        c === "'"
      )
    ) {
      return false;
    }
  }
  return true;
}

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

function setSubmitButton(text) {
  document.getElementById("submitButton").textContent = text;
}

function formSubmit(event) {
  event.preventDefault();

  const { valid, data } = validateForm();

  if (!valid) return;

  if (editingIndex !== null) {
    employeeData[editingIndex] = data;
    editingIndex = null;
    setSubmitButton("Submit");
  } else {
    employeeData.push(data);
  }

  renderTable();

  document.getElementById("resetButton").disabled = false;
  makeCursorPointer();

  resetError();

  document.querySelector("form").reset();
}

function renderTable() {
  const table = document.getElementById("employee");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  if (employeeData.length === 0) {
    table.style.display = "none";
    return;
  } else {
    table.style.display = "table";
  }
  employeeData.forEach((emp, idx) => {
    const row = document.createElement("tr");
    row.insertCell(0).innerHTML = `${idx + 1}.`;
    row.insertCell(1).innerHTML = emp.firstName;
    row.insertCell(2).innerHTML = emp.lastName;
    row.insertCell(3).innerHTML = emp.email;
    row.insertCell(4).innerHTML = emp.gender;
    row.insertCell(5).innerHTML = emp.city;
    row.insertCell(6).innerHTML = emp.courses.join(", ");
    row.insertCell(7).innerHTML =
      `<button class="edit-btn" onclick="onEdit(${idx})">Edit</button>` +
      `<button class="delete-btn" onclick="onDelete(${idx})">Delete</button>`;
    tbody.appendChild(row);
  });
}

function onDelete(idx) {
  employeeData.splice(idx, 1);
  renderTable();
}

function onEdit(idx) {
  const emp = employeeData[idx];
  editingIndex = idx;
  document.getElementById("fname").value = emp.firstName;
  document.getElementById("lname").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("city").value = emp.city;

  document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.checked = radio.value === emp.gender;
  });
  document.querySelectorAll('input[name="courses"]').forEach((checkbox) => {
    checkbox.checked = emp.courses.includes(checkbox.value);
  });

  resetError();
  disableButton();
  setBackgroundColor();
  makeCursorNotAllowed();
  setSubmitButton("Save");
}

function disableButton() {
  document.getElementById("resetButton").disabled = true;
  const deleteButton = document.getElementsByClassName("delete-btn");

  for (let btn of deleteButton) {
    btn.disabled = true;
  }

  const editButtons = document.getElementsByClassName("edit-btn");

  for (let btn of editButtons) {
    btn.disabled = true;
  }
}

function resetError() {
  document.getElementById("firstNameError").textContent = "";
  document.getElementById("lastNameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("cityError").textContent = "";
  document.getElementById("genderError").textContent = "";
  document.getElementById("coursesError").textContent = "";
}

function makeCursorNotAllowed() {
  const btn1 = document.getElementById("resetButton");
  btn1.style.cursor = "not-allowed";
  btn1.style.backgroundColor = "#a8d6f5"

  const deleteButton = document.getElementsByClassName("delete-btn");

  for (let btn of deleteButton) {
    btn.style.cursor = "not-allowed";
    btn.style.backgroundColor = "#e74c3c"
  }

  const editButtons = document.getElementsByClassName("edit-btn");

  for (let btn of editButtons) {
    btn.style.cursor = "not-allowed";
    btn.style.backgroundColor = "rgb(247, 247, 79)"
  }
}

function makeCursorPointer() {
  const btn1 = document.getElementById("resetButton");
  btn1.style.cursor = "pointer";
}

function setBackgroundColor() {
  const btn1 = document.getElementById("resetButton");
  btn1.style.backgroundColor = "#a8d6f5"

  const deleteButton = document.getElementsByClassName("delete-btn");

  for (let btn of deleteButton) {
    btn.style.backgroundColor = "#e74c3c"
  }

  const editButtons = document.getElementsByClassName("edit-btn");

  for (let btn of editButtons) {
    btn.style.backgroundColor = "rgb(247, 247, 79)"
  }
}
