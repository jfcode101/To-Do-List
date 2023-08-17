const body = document.body;
const input = document.querySelector("#task-input");
const btnInput = document.querySelector("#input-btn");
const ul = document.querySelector(".list-container");

// dispay today message
function displayToday() {
  const d = new Date();
  const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const mnths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = days[d.getDay() - 1];
  const month = mnths[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();
  const now = `${today}  ${month} ${date}, ${year}`;
  return now;
}
// call display
const x = displayToday();
// pu it in the
document.querySelector("#para-date").innerHTML = x;

// when the user presses the enter key
input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addTask();
    input.value = "";
  }
});

// when the user clicks the add task button
btnInput.addEventListener("click", () => {
  addTask();
  input.value = "";
});

// add a task
function addTask() {
  if (input.value === "") {
    alertPanel();
  } else {
    createLi();
  }
}

// function to create a panel or modal box
function alertPanel() {
  // create a panel
  const panel = document.createElement("div");
  panel.setAttribute("class", "msgPanel");
  body.appendChild(panel);

  // create icon to display on the panel
  const warningIcon = document.createElement("i");
  warningIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
  warningIcon.style.color = "yellow";
  panel.appendChild(warningIcon);

  // create alert message
  const alretMsg = document.createElement("p");
  alretMsg.classList.add("para");
  alretMsg.textContent = "You must add a task!";
  panel.appendChild(alretMsg);

  // create exit button
  const exitBtn = document.createElement("button");
  exitBtn.classList.add("exit");
  exitBtn.innerHTML = "&times;";
  panel.appendChild(exitBtn);

  // disable the input box and the button
  input.disabled = true;
  btnInput.disabled = true;
  btnInput.classList.remove("btn-hover");

  // add an event listener to the exit button
  exitBtn.addEventListener("click", () => {
    body.removeChild(panel);
    input.disabled = false;
    input.focus();
    btnInput.disabled = false;
    btnInput.classList.add("btn-hover");
  });
}

// function to create list items
function createLi() {
  const li = document.createElement("li");

  // create a paragraph
  const paraIcon = document.createElement("p");
  paraIcon.setAttribute("class", "paraIcon");

  // unchecked icon
  const unchecked = document.createElement("span");
  unchecked.innerHTML = `<i class="fa-regular fa-circle"></i>`;

  // checked icon
  const checked = document.createElement("span");
  checked.setAttribute("class", "spanHidden");
  checked.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;

  // append checked icon
  paraIcon.appendChild(unchecked);

  // add event listener to the unchecked button
  unchecked.addEventListener("click", () => {
    unchecked.classList.add("spanHidden");
    checked.classList.remove("spanHidden");
    // append checked icon
    paraIcon.appendChild(checked);

    // change the li
    li.style.color = "#686869";
    li.style.textDecoration = "line-through";
  });

  checked.addEventListener("click", () => {
    checked.classList.add("spanHidden");
    unchecked.classList.remove("spanHidden");

    // change the li
    li.style.color = "#001510";
    li.style.textDecoration = "none";
  });

  // delete button
  const btn = document.createElement("i");
  btn.classList.add("btnLi");
  btn.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;

  li.setAttribute("class", "list-item");
  li.innerHTML = input.value
    .toString()
    .replace(
      input.value.toString()[0],
      input.value.toString()[0].toUpperCase()
    );

  li.prepend(paraIcon);
  li.appendChild(btn);
  ul.appendChild(li);

  // remove the item from our to do list
  btn.addEventListener("click", () => ul.removeChild(li));
}
