const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function find() {
  const query = db('users').select('id', 'username', 'department'); 
  return query;
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
   const [id] = await db('users').insert(user);
  console.log('id', id)
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function remove(id){
  return db('users')
  .where('id', id)
  .del();
}