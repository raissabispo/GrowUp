import fs from 'node:fs/promises';
import path from 'node:path';

// Define o caminho absoluto para o arquivo db.json na raiz do projeto
const databasePath = path.resolve(process.cwd(), 'db.json');

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }
    this.#database[table].push(data);
    this.#persist();
    return data;
  }
}