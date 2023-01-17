export type TTicket = {
  id: string,
  order: string,
  type: string,
  validated?: boolean,
};

export type TTicketType = {
  name: string
  price: number
  quantityLeft: number
}

export type TEvents = {
  dates: Array<any>
  id: string
  location: string
  name: string
  ticketTypes: Array<TTicketType>
}

export enum EHandlerIncDec {
 dec = 'DECREMENT',
 inc = 'INCREMENT'
}
