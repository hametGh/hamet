import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const init = (dbPath) => {
  const file = join(dbPath);
  const adapter = new JSONFile(file);
  return new Low(adapter);
};

export default init;
