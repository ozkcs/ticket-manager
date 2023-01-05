export type TTicket = {
  id: string,
  order: string,
  type: string,
  validated?: boolean,
};

export enum EHandlerIncDec {
 dec = 'DECREMENT',
 inc = 'INCREMENT'
}
