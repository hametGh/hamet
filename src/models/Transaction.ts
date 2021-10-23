export type Transaction = {
  id: string;
  type: string;
};
export type Data = {
  [name: string]: Transaction[];
};
