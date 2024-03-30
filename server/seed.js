import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS FBforGenZ (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    status TEXT
    )
`);

const insertStatus = db.prepare(
  `INSERT INTO FBforGenZ (username, status) VALUES (?, ?)`
);

insertStatus.run("cottagecoregirlie", "mothering my tamagotchi fr");
insertStatus.run("06techbro", "in my motorola rzr era");
insertStatus.run("futureswiftie", "we need a global superstar country/pop diva on the scene no cap");
insertStatus.run("markzuckerberg", "this website actually slaps tho");
insertStatus.run("OGinfluencer", "felt cute, might delete later");
insertStatus.run("bradpitt", "everyone loves me");
insertStatus.run("jenniferaniston", "we can all see this Brad");