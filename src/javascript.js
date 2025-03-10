var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const form = document.getElementById("contact-form");
const name_entry = document.getElementById("name");
const email_entry = document.getElementById("email");
const text_entry = document.getElementById("message");
const topic_entry = document.getElementById("topic");
const allowedPattern_name = /^[a-zA-Z0-9_ ]+$/;
let form_errors = {};

ctx.fillStyle = "#3498db"; // Set the fill color to blue
ctx.fillRect(50, 50, 200, 100); // Draw a rectangle at (50,50) with width 200 and height 100

// Define the <hello-world> custom element
class HelloWorld extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Print "Hello World!" to the console
    console.log("Hello World!");
  }
}

// Register the custom element
customElements.define("hello-world", HelloWorld);

function formsubmit(event) {
  event.preventDefault(); // Prevent default form submission

  // Prepare data to be submitted
  let name = name_entry.value;
  let email = email_entry.value;
  let message = text_entry.value;
  let topic = topic_entry.value;

  const fetchData = new URLSearchParams();
  fetchData.append("name", name);
  fetchData.append("email", email);
  fetchData.append("message", message);
  fetchData.append("topic", topic);
  fetchData.append("form-errors", JSON.stringify(form_errors));
  // Submit data using fetch
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: fetchData.toString(),
  })
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      console.log("Server Response:", data);
      alert("Form submitted successfully!"); // Notify successful submission
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    });

  // Reset the form values after submission
  name_entry.value = "";
  email_entry.value = "";
  text_entry.value = "";
}

name_entry.addEventListener("input", (event) => {
  validate(name_entry);
  if (!allowedPattern_name.test(name_entry.value)) {
    error = "Your input has illegal chracters";
    name_entry.setCustomValidity(error);
    form_errors["name_entry"] = error;
    showErrorMessage(error, "name");
  }
  if (!name_entry.checkValidity()) {
    error = name_entry.validationMessage;
    form_errors["name_entry"] = error;
  } else {
    delete form_errors["name_entry"];
  }
});

email_entry.addEventListener("input", (event) => {
  validate(email_entry);
  if (!email_entry.checkValidity()) {
    error = email_entry.validationMessage;
    form_errors["email_entry"] = error;
  } else {
    delete form_errors["email_entry"];
  }
});

text_entry.addEventListener("input", (event) => {
  validate(text_entry);
  if (!allowedPattern_name.test(text_entry.value)) {
    error = "Your input has illegal chracters";
    form_errors.setCustomValidity(error);
    form_errors["text_entry"] = error;
    showErrorMessage(error, "message");
  }
  if (!text_entry.checkValidity()) {
    error = text_entry.validationMessage;
    form_errors["text_entry"] = error;
  } else {
    delete form_errors["text_entry"];
  }
  const remaining = 300 - text_entry.value.length;
  const charCount = document.getElementById("countdown");
  charCount.textContent = `${remaining} characters left`;
  charCount.classList.toggle("warning", remaining < 50);
  charCount.classList.toggle("error", text_entry.value.length > 300);
});

function showErrorMessage(message = "Your input has illegal chracters", type) {
  const errorMessage1 = document.getElementById(`${type}_error`);
  const errorMessage2 = document.getElementById(`${type}_info`);
  let index = 0;
  if (type == "name") {
    index = 0;
  } else if (type == "mail") {
    index = 1;
  } else {
    index = 2;
  }
  const errorMessageContainer =
    document.getElementsByClassName("error_container")[index];
  // Set the error message
  errorMessage1.textContent = "Error:";

  errorMessage2.textContent = message;
  errorMessageContainer.classList.add("flash");
  setTimeout(() => {
    errorMessageContainer.style.transition = "opacity 1s";
    errorMessageContainer.style.opacity = 0;

    setTimeout(() => {
      errorMessageContainer.style.display = "none";
      errorMessageContainer.style.opacity = 1;
      errorMessageContainer.classList.remove("flash");
    }, 1000);
  }, 3000);
}

function validate(inputID) {
  const input = inputID;
  const validityState = input.validity;
  if (validityState.valueMissing) {
    input.setCustomValidity("You gotta fill this out, yo!");
  } else if (validityState.tooShort) {
    input.setCustomValidity("The input is too short!");
  } else if (validityState.tooLong) {
    input.setCustomValidity("The input is too long!");
  } else if (validityState.typeMismatch) {
    input.setCustomValidity("The input is not an email!");
  } else {
    input.setCustomValidity("");
  }
  input.reportValidity();
}

document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme
  const themeToggleButton = document.getElementById("theme"); // Select the button
  if (!themeToggleButton) {
    console.error("Theme toggle button not found!");
    return;
  }
  if (localStorage.getItem("theme") === "light") {
    console.log("lightmode");
    document.body.classList.add("light-mode");
    themeToggleButton.textContent = "🌞";
  } else {
    console.log("no lightmode");
    document.body.classList.add("dark-mode");
    themeToggleButton.textContent = "🌙";
  }

  // Toggle theme on button click
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeToggleButton.textContent = "🌞";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggleButton.textContent = "🌙";
    }
  });
});
