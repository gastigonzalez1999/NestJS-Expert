/* eslint-disable prettier/prettier */
export interface PokeResponse {
  cout: number;
  next: string;
  previous: null;
  results: Result[];
}


export interface Result {
  name: string;
  url: string;
}
