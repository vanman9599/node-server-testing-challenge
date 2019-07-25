const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  const query = db('cars').select('id', 'make', 'model', 'year', 'VIN');

  return query;
}

function findBy(filter) {
  return db('cars').where(filter);
}

async function add(car) {
  const [id] = await db('cars').insert(car);

  return findById(id);
}

function findById(id) {
  return db('cars')
    .where({ id })
    .first();
}