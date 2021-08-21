import server from "./server";

// Import interface
import { Options } from "../lib/interfaces";

// Import middleware
import middleware from "../lib/middleware";

// initializing hamet
const hamet = (db: string, options: Options) => {
  server.init(options);
  return middleware;
};

export = hamet;
