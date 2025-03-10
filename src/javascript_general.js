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

  projects = [
    {
      name: "HARO Anime Song Recommender",
      img: "../assets/image1.png",
      img_description: "The homepage of the website",
      description:
        "A website that can recommend the most recent popular anime songsthrough spotify api, allowing users to try out the recommended songs and save them into their personal Spotify playlist.",
      link: "https://github.com/XDawn66/Spotify_anime_song_recommanders",
    },
    {
      name: "The Snake Game",
      img: "../assets/snake.png",
      img_description: "The gameplay of the snake game",
      description:
        "Created a classic snake game with C++ and conio.h library. The snakecan grow longer and longer as they eat more fruits on the map. The player will use WASD keys to control the snake and lose if their snake eats its tail or hit the edge of the map.",
      link: "https://github.com/XDawn66/snake-game/tree/main/Snake/conio.h",
    },
    {
      name: "Pig Games",
      img: "../assets/pig.png",
      img_description: "The gameplay of the pig game",
      description:
        "Created a game that allows two players to take terms to roll a dice. Getting dice one = lost all points at that round && switch player. 1st get 100 = victory! Using javascript,CSS,HTML,and DOM manipulation.",
      link: "https://github.com/XDawn66/Pig-game",
    },
  ];
  localStorage.setItem("projects", JSON.stringify(projects));
});

class Projectcard extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
  }
}

customElements.define("project-card", Projectcard);

function load_projects(local = true) {
  let project_data = {};

  if (!local) {
    let req = new XMLHttpRequest();
    const masterkey =
      "$2a$10$s/mnC6Isqfd0rweI4lwDC.HVQC8znn3cjcmh/G1PH4ditoPpDqBbC";
    const bin_id = "67ce841d8a456b796673021d";
    const accesskey =
      "$2a$10$Q9Jqk.7hAQOToh/.xvgLk..F3Iia7u5UejSXiOK4X173rY7NxVgia";

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
          project_data = JSON.parse(req.responseText);
          project_data = project_data["record"]["Projects"];
          create_project_card(project_data);
        } else {
          console.error("Failed to load project data");
        }
      }
    };
    req.open("GET", `https://api.jsonbin.io/v3/b/${bin_id}`, true);
    req.setRequestHeader("X-Master-Key", masterkey);
    req.setRequestHeader("X-Access-Key", accesskey);
    req.send();
    console.log(project_data);
  } else {
    project_data = JSON.parse(localStorage.getItem("projects"));
    console.log("local storage", project_data);
    create_project_card(project_data);
  }
}

function create_project_card(project_data) {
  const project_section = document.getElementById("projects");

  for (let i = 0; i < project_data.length; i++) {
    let project_container = document.createElement("project-card");
    let project_title = document.createElement("h1");
    project_title.textContent = project_data[i].name;
    let project_image_container = document.createElement("picture");
    let project_image = document.createElement("img");
    project_image.src = project_data[i].img;
    project_image.alt = project_data[i].img_description;
    project_image_container.appendChild(project_image);
    let project_description = document.createElement("p");
    project_description.textContent = project_data[i].description;
    let project_button = document.createElement("button");
    project_button.textContent = "View Project";
    project_button.onclick = () => {
      window.open(project_data[i].link);
    };
    project_container.appendChild(project_title);
    project_container.appendChild(project_image_container);
    project_container.appendChild(project_description);
    project_container.appendChild(project_button);
    project_section.appendChild(project_container);
  }
}
