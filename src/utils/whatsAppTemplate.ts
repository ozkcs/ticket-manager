
export const sendLinkQRCodes = (first_name: string, eventName: string, date: string, place: string, ticketQuantities: number, total: number, typeOfTicket: string) => {

  const name = first_name && first_name.replace(first_name.charAt(0), first_name.charAt(0).toUpperCase())
  const moreThanOneTicket = ticketQuantities > 1 && 's'

  const template = `
  Hola ${name}, *_Ticket Manager_* te saluda! 👋

    *Detalles de tu${moreThanOneTicket} tiquete${moreThanOneTicket}* 🎟️
    • Evento: ${eventName}
    • Fecha: ${date}
    • Lugar: ${place}
    • Cantidad de tiquetes: ${ticketQuantities} _(${typeOfTicket})_
    • Total: ${total} colones

  En el siguiente link 👉 https://www.hermosasoftware.io/ encontrarás tus tiquetes los cuáles deben ser descargados para ser usados el dia del Evento como entrada.
  `
  return encodeURIComponent(template)
} 
