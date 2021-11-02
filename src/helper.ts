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

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser.
 * @link http://slavik.meltser.info/?p=142
 */
export const guid = () => {
  function _p8(s: any) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8(undefined) + _p8(true) + _p8(true) + _p8(undefined);
};
