import { Request } from "express";
import { Transaction } from "./lib/types/Transaction";
import { Trigger } from "./lib/types/Trigger";
import { Check } from "./lib/types/Check";
import { TriggerBy } from "./lib/enums/index.js";
import { Condition } from "./lib/types/Condition";

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

/**
 * filter transactions with method
 * @param t Transaction
 * @param method string
 */
export const filterByMethod = (
  t: Transaction[],
  method: string
): Transaction[] => {
  let result = [<Transaction>{}];
  result = t.filter((property) => property.method === method) as any;
  return result;
};

/**
 * check if request triggered or not
 * @param trgger Trigger[]
 * @param triggerBy TriggerBy
 * @param req Request
 */
export const isTriggered = (
  triggers: Trigger[],
  triggerBy: Check,
  req: Request
): boolean => {
  let result: boolean = true;
  let triggerStat: boolean[] = [];

  for (let trigger of triggers) {
    let currentStat: boolean = false;
    switch (trigger.by) {
      // check by request parameters
      case TriggerBy.PARAM:
        if (checkCondition(req.params, trigger.condition)) currentStat = true;
        break;
      // check by request AGENT
      case TriggerBy.USER_AGENT:
        break;
      // check by request BODY
      case TriggerBy.BODY:
        break;
      // check by request COOKIE
      case TriggerBy.COOKIE:
        break;
      // check by request HEADER
      case TriggerBy.HEADER:
        break;
    }
    triggerStat.push(currentStat);
  }

  // CHECK ADN OR HERE
  console.log(triggerStat);

  return result;
};

/**
 * check conditions of trigger
 * @param source any
 * @example req.params, req.headers
 * @param conditions Condition
 */
const checkCondition = (source: any, conditions: Condition[]): boolean => {
  let conditionStat: boolean = true;
  for (let cond of conditions) {
    if (!compare(source[cond.property], cond.operator, cond.value))
      conditionStat = false;
  }
  return conditionStat;
};

/**
 * check two value
 * @param prop any
 * @param operator string
 * @param value any
 */
const compare = (prop: any, operator: string, value: any) => {
  switch (operator) {
    case ">":
      return prop > value;
    case "<":
      return prop < value;
    case ">=":
      return prop >= value;
    case "<=":
      return prop <= value;
    case "==":
      return prop == value;
    case "!=":
      return prop != value;
    case "===":
      return prop === value;
    case "!==":
      return prop !== value;
    case "startWith":
      return prop.startsWith(value);
    case "include":
      return prop.includes(value);
    case "endWith":
      return prop.endsWith(value);
    case "notInclude":
      return !prop.includes(value);
  }
};
