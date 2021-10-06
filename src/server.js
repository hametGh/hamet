import express from "express";
import routes from "./routes.js";

const app = express();

// Define routes
app.use(routes);

/**
 * The GUI end-point will be started
 * if the configuration is set to true
 * @param server
 */
export const init = (server) => {
  const { gui } = server;
  if (gui?.enabled) {
    console.log("hamet GUI is running on ", gui.port || 1010);
    app.listen(gui.port || 1010);
  }
};
export default app;
