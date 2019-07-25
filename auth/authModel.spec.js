const db = require('../data/dbConfig.js');

const Users = require('./auth-model.js');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('insert()', () => {
    it('should insert the users into the db', async () => {
      await Users.add({ username: 'gaffer', password: 'pass' }); // using the api

      const users = await db('users'); // directly looking into db

      expect(users).toHaveLength(1);
    });

    it('should insert the users into the db', async () => {
      await Users.add({ username: 'elanor', password: 'pass' }); // using the api
      await Users.add({ username: 'rose', password: 'pass' }); // using the api

      const users = await db('users'); // directly looking into db

      expect(users).toHaveLength(2);
    });
  });

  describe('delete()', () => {
    it('should delete the users from the db', async () => {
      await Users.remove(1); // using the api

      const users = await db('users'); // directly looking into db

      expect(users).toHaveLength(0);
    });

    it('should delete the users from the db', async () => {
      await Users.remove(2); // using the api
      await Users.remove(3); // using the api

      const users = await db('users'); // directly looking into db

      expect(users).toHaveLength(0);
    });
  });
});