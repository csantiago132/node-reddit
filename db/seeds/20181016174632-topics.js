'use strict';
const faker = require('faker');

let topics = [];

for (let i = 1; i <= 15; i++) {
  topics.push({
    title: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Topics', topics, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Topics', null, {});
  },
};
