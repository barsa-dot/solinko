const sqlite3 = require('sqlite3').verbose();
const { faker } = require('@faker-js/faker');

const db = new sqlite3.Database('./database/database.db');

for (let i = 0; i < 50; i++) {

  const name = faker.company.name();
  const city = faker.location.city();
  const email = faker.internet.email();
  const rating = faker.number.float({
    min: 3,
    max: 5,
    multipleOf: 0.1
  });

  db.run(`
    INSERT INTO vendors (name, city, email, rating)
    VALUES (?, ?, ?, ?)
  `,
  [name, city, email, rating]);

}

console.log("Fake vendor data added.");

db.close();