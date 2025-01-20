import sql from "./db.js";
sql`DROP TABLE IF EXISTS videos;`.then(() => {
  console.log('Tabela videos deletada com sucesso!')
})

sql`CREATE TABLE videos (
  id varchar(255) PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  duration INTEGER NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  views integer NOT NULL DEFAULT 0
);
`.then(() => {
  console.log('Tabela videos criada com sucesso!')
})