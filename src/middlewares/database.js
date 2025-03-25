import fs from 'node:fs/promises'
import path from 'node:path';

const databasePath = path.resolve(process.cwd(), 'db.json');


export class Database {
    #database = {}
 constructor(){
  fs.readFile(databasePath, 'utf8').then(data =>{
    this.#database = JSON.parse(data)
  })
  .catch(()=>{
    this.#persist()
  })
 }
    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
  
    select(table) {
     const data = this.#database[table] ?? []

     return data 
    }
  
    insert(table, data) {
      // Verifica se a tabela existe, caso contrário, inicializa como um array vazio
      if (!Array.isArray(this.#database[table])) {
          this.#database[table] = [];
      }
      // Adiciona o item à tabela
      this.#database[table].push(data);
      // Persiste os dados no arquivo
      this.#persist();
      return data;
  }
  }
