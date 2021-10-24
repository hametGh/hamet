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
}
