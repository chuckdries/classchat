-- Up
CREATE TABLE users (id INTEGER PRIMARY KEY, email STRING NOT NULL, name STRING, passwordHash STRING NOT NULL);
CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  date INTEGER NOT NULL,
  message STRING NOT NULL,
  userid INTEGER,
  author STRING,
  room STRING,
  FOREIGN KEY(userid) REFERENCES users(id));
CREATE TABLE sessions (userid INTEGER NOT NULL, sessionToken STRING NOT NULL PRIMARY KEY, FOREIGN KEY(userid) REFERENCES users(id));

-- Down
DROP TABLE messages;
DROP TABLE users;
DROP TABLE sessions;