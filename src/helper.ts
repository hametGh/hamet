import { Data } from "./lib/types/Index";
import { Transaction } from "./lib/types/Transaction";

/**
 * find transaction by id
 * @param data Data
 * @param tId String
 */
export const findTransaction = (data: Data | null, tId: string) => {
  let paths = Object.keys(data!);
  let result;
  paths.forEach((item) => {
    result = data![item].find(({ id }) => id === tId);
  });
  return result;
};
