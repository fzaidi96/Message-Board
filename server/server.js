import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(8080, function () {
  console.log("Server listening at http://localhost:8080");
});

const db = new Database("database.db");

app.get("/", function (request, response) {
  const statuses = db.prepare("SELECT * FROM FBforGenz").all();
  response.json(statuses);
});

// Adds a new status from user input into the database
app.post("/statuses", function (request, response) {
  const username = request.body.username;
  const status = request.body.status;
  
  // Set default value of upvotes to 0 directly in the SQL query
  const newStatus = db
    .prepare(`INSERT INTO FBforGenz (username, status, upvotes) VALUES (?, ?, 0)`)
    .run(username, status);
  
  response.json(newStatus);
});

// Deletes a status from the database
app.delete("/statuses/:id", function (request, response) {
  const post = db.prepare("DELETE FROM FBforGenZ WHERE id=?").run(request.params.id);
  response.json(post);
});
