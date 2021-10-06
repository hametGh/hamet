import app, { init } from "./server.js";
import Storage from "../lib/storage.js";

// Import utilities
import middleware from "../lib/middleware.js";

// initializing hamet
const hamet = (db, options) => {
  // initializing GUI end-points
  const storage = Storage(db);
  console.log(storage)
  init(options);
  return middleware;
};
export default hamet;
