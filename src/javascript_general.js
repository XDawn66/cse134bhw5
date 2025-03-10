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
