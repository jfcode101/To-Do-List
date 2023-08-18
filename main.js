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

// display it on the page
document.querySelector("#para-date").innerHTML = x;

// when the user presses the enter key
input.addEventListener(
  "keydown",
  (e) => {
    if (e.keyCode === 13) {
      addTask();
      input.value = "";
    }
  },
  false
);

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
  const panel = createDiv();
  const warningIcon = createWarning();
  const alretMsg = createPara();
  const exitBtn = buttonExit();
  // create alert message
  alretMsg.removeAttribute("paraIcon");
  alretMsg.setAttribute("class", "para");
  alretMsg.textContent = "You must add a task!";
  // append children to their respective parents
  body.appendChild(panel);
  panel.appendChild(warningIcon);
  panel.appendChild(alretMsg);
  panel.appendChild(exitBtn);
  // call disable input function
  disableInput();
  // add an event listener to the exit button
  exitBtn.addEventListener("click", () => {
    body.removeChild(panel);
    enableInput();
  });
}

// create div  function
function createDiv() {
  const panel = document.createElement("div");
  panel.setAttribute("class", "msgPanel");
  return panel;
}

// function to create the rectangle warning symbol
function createWarning() {
  const warningIcon = document.createElement("i");
  warningIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
  warningIcon.style.color = "#ffdf00";
  return warningIcon;
}

// create exit button function on the panel
function buttonExit() {
  const exitBtn = document.createElement("button");
  exitBtn.classList.add("exit");
  exitBtn.innerHTML = "&times;";
  return exitBtn;
}

// disable input box and button
function disableInput() {
  input.disabled = true;
  btnInput.disabled = true;
  btnInput.classList.remove("btn-hover");
}

// enable input box and button
function enableInput() {
  input.disabled = false;
  input.focus();
  btnInput.disabled = false;
  btnInput.classList.add("btn-hover");
}

// function to create list items
function createLi() {
  const li = document.createElement("li");
  const para = createPara();
  const unchecked = uncheckedIcon();
  const checked = checkedIcon();
  const btn = deleteButton();

  // append checked icon
  para.appendChild(unchecked);

  // add event listener to para
  para.addEventListener("click", () => {
    if (checked.classList.contains("spanHidden")) {
      unchecked.classList.add("spanHidden");
      checked.classList.remove("spanHidden");
      // append checked icon
      para.appendChild(checked);
      // change the li
      li.style.color = "#686869";
      li.style.backgroundColor = "#eee";
      li.style.textDecoration = "line-through";
    } else {
      checked.classList.add("spanHidden");
      unchecked.classList.remove("spanHidden");
      // change the li
      li.style.color = "#001510";
      li.style.textDecoration = "none";
    }
  });

  li.setAttribute("class", "list-item");
  li.innerHTML = input.value
    .toString()
    .replace(
      input.value.toString()[0],
      input.value.toString()[0].toUpperCase()
    );

  li.prepend(para);
  li.appendChild(btn);
  ul.appendChild(li);

  // remove the item from our to do list
  btn.addEventListener("click", () => ul.removeChild(li));
}

// function that creates a paragraph
function createPara() {
  const para = document.createElement("p");
  para.setAttribute("class", "paraIcon");
  return para;
}

// function that creates unchecked icon
function uncheckedIcon() {
  const unchecked = document.createElement("span");
  unchecked.innerHTML = `<i class="fa-regular fa-circle"></i>`;
  return unchecked;
}

// function that creates checked icon
function checkedIcon() {
  const checked = document.createElement("span");
  checked.setAttribute("class", "spanHidden");
  checked.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
  return checked;
}

// function that creates the delete button
function deleteButton() {
  const btn = document.createElement("i");
  btn.classList.add("btnLi");
  btn.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
  return btn;
}
