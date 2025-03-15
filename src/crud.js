function add() {
  let title = prompt("Enter the project name");
  let img = prompt("Enter the image link");
  let description = prompt("Enter the project description");
  let link = prompt("Enter the project link");
  let project_data = JSON.parse(localStorage.getItem("projects"));
  project_data.push({
    name: title,
    img: img,
    description: description,
    link: link,
  });
  localStorage.setItem("projects", JSON.stringify(project_data));
  alert("Project added successfully!");
  location.reload();
}

function read() {
  let project_data = JSON.parse(localStorage.getItem("projects"));
  let table = document.getElementById("crud_table");
  for (let i = 0; i < project_data.length; i++) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = project_data[i].name;
    cell2.innerHTML = project_data[i].img;
    cell3.innerHTML = project_data[i].description;
    cell4.innerHTML = project_data[i].link;
  }
}

function remove() {
  let title = prompt("Enter the project name to remove");
  if (title == null) {
    return;
  }
  let project_data = JSON.parse(localStorage.getItem("projects"));
  let index = project_data.findIndex((project) => project.name === title);
  project_data.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(project_data));
  alert("Project removed successfully!");
  location.reload();
}

function update() {
  let title = prompt("Enter the project name to update");
  if (title == null) {
    return;
  }
  let project_data = JSON.parse(localStorage.getItem("projects"));
  let index = project_data.findIndex((project) => project.name === title);
  let img = prompt("Enter the new image link");
  let description = prompt("Enter the new project description");
  let link = prompt("Enter the new project link");
  project_data[index].img = img;
  project_data[index].description = description;
  project_data[index].link = link;
  localStorage.setItem("projects", JSON.stringify(project_data));
  alert("Project updated successfully!");
  location.reload();
}
