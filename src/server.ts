import app from './app';

import Database from './infra/models/database';

const database = new Database();

const PORT = 3001;

init();

async function init() {
  try {
    database.initialize();
    await database.reset();

    app.listen(PORT, () => {
      console.log(`Server on port ${PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
