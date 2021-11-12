export enum HookTypes {
  PRE_RESPONSE,
  PRE_REQUEST,
}

export enum Operator {
  EQUAL = "===",
  NOT_EQUAL = "!==",
  START_WITH = "startWith",
  END_WITH = "endWith",
  INCLUDE = "include",
  NOT_INCLUDE = "notInclude",
}

export enum TriggerBy {
  PARAM,
  HEADER,
  COOKIE,
  BODY,
  USER_AGENT,
  QUERY_STRING,
}

export enum ActionType {
  MODIFY,
  ALERT,
}

export enum ModifyType {
  CHANGE_STATUS,
  CHANGE_HEADERS,
  CHANGE_COOCKIES,
  CHANGE_REQUEST,
  CHANGE_REPONSE,
  CHANGE_REPONSE_VALUE,
}
export enum AlertType {
  WEBHOOK = "webhook",
  SLACK = "slack",
}
