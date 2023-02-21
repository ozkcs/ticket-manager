
export const sendLinkQRCodes = (first_name: string, eventName: string, date: string, place: string, ticketQuantities: number, total: number, typeOfTicket: string, orderId:string) => {

  const name = first_name && first_name.replace(first_name.charAt(0), first_name.charAt(0).toUpperCase())
  const moreThanOneTicket = ticketQuantities && ticketQuantities > 1 && 's'

  const template = `
  Hola ${name}, *_Ticket Manager_* te saluda! 👋

    *Detalles de tu${moreThanOneTicket} tiquete${moreThanOneTicket}* 🎟️
    • Evento: ${eventName}
    • Fecha: ${date}
    • Lugar: ${place}
    • Cantidad de tiquetes: ${ticketQuantities} 
    • Total: ${total} colones

  En el siguiente link 👉 ${window.location.origin}/order/${orderId}/  encontrarás tus tiquetes los cuáles debes presentar a la entrada el dia del evento.
  `
  //TODO: Change for env variable for security
  return encodeURIComponent(template)
} 
