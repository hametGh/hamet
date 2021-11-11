import app, { init } from "./server.js";
import Storage from "./storage.js";

import { Options } from "./lib/types/Options";

// // Import utilities
import middleware from "./middleware.js";

// initializing hamet
const hamet = (options: Options) => {
  // initial db
  const db = Storage(options.dbPath);

  // initializing GUI end-points
  init(options);

  return middleware(db);
};

export default hamet;
