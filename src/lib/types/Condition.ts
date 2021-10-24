import { Operator } from "../enums";
export type Condition = {
  property: string;
  operator: Operator;
  value: String | Number | Boolean;
};
