// server/index.js
'use strict';

const app = require('./app');
const PORT = process.env.PORT || 9000;

app.express.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
