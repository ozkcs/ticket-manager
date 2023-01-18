export type TTicket = {
  id: string,
  order: string,
  type: string,
  validated?: boolean,
  price?: number
};

export type TTicketType = {
  name: string
  price: number
  quantityLeft: number
}

export type TEvents = {
  date: any
  id: string
  location: string
  name: string
  ticketTypes: Array<TTicketType>
}

export enum EHandlerIncDec {
 dec = 'DECREMENT',
 inc = 'INCREMENT'
}
