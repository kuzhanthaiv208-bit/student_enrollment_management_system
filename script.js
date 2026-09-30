
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");
const count = document.getElementById("count");

let students = JSON.parse(
  localStorage.getItem("students") || "[]"
);

function saveStudents() {
  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}

function displayStudents(filter = "") {
  studentList.innerHTML = "";

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase()) ||
    student.course.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(student => {
    const row = document.createElement("tr");

    [
      student.id,
      student.name,
      student.email,
      student.phone,
      student.gender,
      student.course,
      student.date
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", () => {
      if (confirm("Delete this student?")) {
        students = students.filter(
          s => s.id !== student.id
        );
        saveStudents();
        displayStudents(search.value);
      }
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    studentList.appendChild(row);
  });

  count.textContent =
    "Total Students: " + students.length +
    " | Showing: " + filtered.length;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const student = {
    id: "STU" + Date.now(),
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value,
    course: document.getElementById("course").value,
    date: document.getElementById("date").value
  };

  const duplicate = students.some(
    s => s.email.toLowerCase() === student.email.toLowerCase()
  );

  if (duplicate) {
    alert("This email is already registered!");
    return;
  }

  students.push(student);
  saveStudents();
  form.reset();
  displayStudents(search.value);

  alert("Student enrolled successfully!");
});

search.addEventListener("input", function() {
  displayStudents(search.value);
});

displayStudents();