import { Request } from "express";

// import types
import { Transaction } from "./lib/types/Transaction";
import { Condition } from "./lib/types/Condition";
import { Trigger } from "./lib/types/Trigger";
import { Check } from "./lib/types/Check";
import { Alert } from "./lib/types/Action";

// import enums
import { TriggerBy, AlertType } from "./lib/enums/index.js";

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
  let triggerStat: boolean[] = [];

  for (let trigger of triggers) {
    let currentStat: boolean = false;

    switch (trigger.by) {
      // check by request parameters
      case TriggerBy.PARAM:
        if (checkCondition(req.params, trigger.condition, "object"))
          currentStat = true;
        break;
      // check by request AGENT
      case TriggerBy.USER_AGENT:
        if (
          checkCondition(req.headers["user-agent"], trigger.condition, "string")
        )
          currentStat = true;
        break;
      // TODO check by request BODY
      case TriggerBy.BODY:
        break;
      // check by request COOKIE
      case TriggerBy.COOKIE:
        if (checkCondition(req.cookies, trigger.condition, "object"))
          currentStat = true;
        break;
      // check by request HEADER
      case TriggerBy.HEADER:
        if (checkCondition(req.headers, trigger.condition, "object"))
          currentStat = true;

        break;
      // check by request QUERY
      case TriggerBy.QUERY_STRING:
        if (checkCondition(req.query, trigger.condition, "object"))
          currentStat = true;
        break;
    }
    triggerStat.push(currentStat);
  }

  // if triggered conf setted to AND
  if (triggerBy === "AND") return triggerStat.every((v) => v === true);
  // if triggered conf setted to OR
  else return triggerStat.some((v) => v === true);
};

/**
 * check conditions of trigger
 * @param source any
 * @example req.params, req.headers
 * @param conditions Condition
 * @param sourceType "object" | "string"
 */
const checkCondition = (
  source: any,
  conditions: Condition[],
  sourceType: "object" | "string"
): boolean => {
  let conditionStat: boolean = true;
  for (let cond of conditions) {
    if (
      sourceType === "object" &&
      !compare(source[cond.property], cond.operator, cond.value)
    )
      conditionStat = false;
    if (sourceType === "string" && !compare(source, cond.operator, cond.value))
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

export const alert = (data: Alert) => {
  switch (data.type) {
    case AlertType.SLACK:
      slack(data);
      break;
    case AlertType.WEBHOOK:
      webhook(data);
      break;
  }
};

export const slack = (data: Alert) => {};
export const webhook = (data: Alert) => {};
