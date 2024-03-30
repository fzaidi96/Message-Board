import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(8080, function () {
  console.log("Server listening at http://localhost:8080");
});

import Database from "better-sqlite3";
const db = new Database("database.db");


app.get("/", function (request, response) {
  const statuses = db.prepare("SELECT * FROM FBforGenz").all();
    response.json(statuses);
});


//adds a new status from user input into the database 
app.post("/statuses", function (request, response) {
  const username = request.body.username;
  const status = request.body.status;
  const newStatus = db.prepare(`INSERT INTO FBforGenz (username, status) VALUES (?,?)`).run(username, status);
    response.json(newStatus);
});

//deletes a status from the database 
app.delete("/statuses/:id", function (request, response) {
    const post = db.prepare("DELETE FROM FBforGenZ WHERE id=?").run(request.params.id);
    response.json(post);
});
