import app, { init } from "./server.js";
import Storage, { add } from "./storage.js";

// // Import utilities
import middleware from "./middleware.js";

// initializing hamet
const hamet = (dbPath: any, options: any) => {
  // initializing GUI end-points
  const db = Storage(dbPath);

  // db.data!["/users/123"] = [{ id: "123", type: "POST" }];

  return middleware(db);
};

export default hamet;
