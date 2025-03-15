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
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
        }
       .project-card {
         display: flex;
         flex-direction: column;
         align-items: center;
         background-color: #333;
         border-radius: 10px;
         padding: 1.5rem;
         text-align: center;
         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
         margin: 1rem;
       }
 
       h2 {
         font-size: 2rem;
         font-weight: bold;
         font-family: "Montserrat", sans-serif;
         color: white;
         margin-bottom: 0.5rem;
       }
 
       img {
         width: 100%;
         max-width: 500px;
         height: auto;
         border-radius: 10px;
         margin-bottom: 1rem;
       }
 
       p {
         width: 60%;
         font-size: 1.2rem;
         font-family: "Montserrat", sans-serif;
         color: white;
         margin-bottom: 1rem;
       }
 
       button {
         padding: 0.5rem 1rem;
         background-color: skyblue;
         color: white;
         border: none;
         border-radius: 10px;
         cursor: pointer;
         font-size: 1.2rem;
         transition: background 0.3s ease;
       }
 
       button:hover {
         background-color: deepskyblue;
       }
        </style>
      <article class="project-card">
      <h2></h2>
      <picture>
      <img src="" alt="Project Image">
      </picture>
      <p></p>
      <button>View Project</button>
      </article>
     `;
    this.titleElement = this.shadowRoot.querySelector("h2");
    this.imageElement = this.shadowRoot.querySelector("img");
    this.descriptionElement = this.shadowRoot.querySelector("p");
    this.buttonElement = this.shadowRoot.querySelector("button");
  }

  static get observedAttributes() {
    return ["title", "image", "description", "link"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.titleElement.textContent = this.getAttribute("title") || "No Title";
    this.imageElement.src = this.getAttribute("image") || "";
    this.imageElement.alt = `Image of ${
      this.getAttribute("title") || "project"
    }`;
    this.descriptionElement.textContent =
      this.getAttribute("description") || "No Description";
    this.buttonElement.onclick = () => {
      const link = this.getAttribute("link");
      if (link) window.open(link, "blank");
    };
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

    project_container.setAttribute("title", project_data[i].name);
    project_container.setAttribute("image", project_data[i].img);
    project_container.setAttribute("description", project_data[i].description);
    project_container.setAttribute("link", project_data[i].link);

    project_section.appendChild(project_container);
  }
}

function add_work_experience() {
  const experienceData = [
    {
      job: "Testing Engineer",
      company: "Hyve Solutions",
      date: "JUNE 2022 - NOV 2022",
      details:
        "Performed the setup, testing, and troubleshooting of Big Tech companies’ computer racks using Putty and SSH",
    },
    {
      job: "Coding Instructor",
      company: "Code For Fun",
      date: "MAR 2023 - JUNE 2023",
      details:
        "Tutored and Helped K-12 students start their CS journey by holding coding classes at local schools.",
    },
  ];
  const template = document.getElementById("workTemplate");
  experienceData.forEach((data) => {
    {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".job-summary").textContent = data.job;
      clone.querySelector(".job-company").textContent = data.company;
      clone.querySelector(".job-date").textContent = data.date;
      clone.querySelector(".job-description").textContent = data.details;
      document.querySelector(".work").appendChild(clone);
    }
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  add_work_experience();
});
