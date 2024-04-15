const logger = require("morgan");
const express = require("express");
const projectsData = require("./data/projects.json");


const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (request, response, next) => {
  response.sendFile(__dirname + "/views/home.html");
});



app.get("/api/projects", (request, response, next) => {
  response.json(projectsData);
});


app.get("/api/projects/:projectId", (request, response, next) => {
  const projectId = request.params.projectId;
  const requestedProject = projectsData.find(
    (project) => project.id === projectId
  );
  if (requestedProject) {
    response.sendFile(__dirname + "/views/project.html");
  } else {
    response.status(404).sendFile(__dirname + "/views/not-found.html");
  }
});

app.get("*", (request, response, next) => {
  response.status(404).sendFile(__dirname + "/views/not-found.html");
});

app.listen(5005, () => console.log("My first app listening on port 5005! "));
