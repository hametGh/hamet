import middleware from "./middleware";
import server from "./server";

// Import interface
import { Options } from "./interfaces";

// initializing hamet
const hamet = (db: string, options: Options) => {
  server.init(options);
  return middleware;
};

export = hamet;
