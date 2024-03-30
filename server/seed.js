import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS FBforGenZ (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    status TEXT,
    upvotes INTEGER DEFAULT 0
    )
`);

const insertStatus = db.prepare(
  `INSERT INTO FBforGenZ (username, status, upvotes) VALUES (?, ?, ?)`
);

insertStatus.run("cottagecoregirlie", "mothering my tamagotchi fr",0);
insertStatus.run("06techbro", "in my motorola rzr era",0);
insertStatus.run("futureswiftie", "we need a global superstar country/pop diva on the scene no cap",0);
insertStatus.run("markzuckerberg", "this website actually slaps tho",0);
insertStatus.run("OGinfluencer", "felt cute, might delete later",0);
insertStatus.run("bradpitt", "everyone loves me",0);
insertStatus.run("jenniferaniston", "we can all see this Brad",0);


