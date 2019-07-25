require('dotenv').config();

const server = require('./api/server.js');

console.log('\n*** db env', process.env.DB_ENV);
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
