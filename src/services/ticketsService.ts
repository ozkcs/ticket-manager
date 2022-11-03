import {
	collection,
	doc,
	getDoc,
	addDoc,
	getDocs,
	query,
	where,
} from "@firebase/firestore";
import { db } from "./firebaseService";

const ticketCollection = collection(db, "sold_tickets");

export const buyTickets = async (
	useInfo: any,
	eventInfo: any
): Promise<string | undefined> => {
	try {
		const promisesBuffer: any = [];

		const userOrder = await addDoc(collection(db, "user_orders"), {
			...useInfo,
			eventId: eventInfo.id,
		});

		eventInfo.aquiredTickets.forEach((ticket: any) => {
			for (
				let quantityPerType = 0;
				quantityPerType < ticket.quantity;
				quantityPerType++
			) {
				promisesBuffer.push(saveTicket(ticket, userOrder.id));
			}
		});

		await Promise.all(promisesBuffer);

		return userOrder.id;
	} catch (err) {
		console.log(err);
	}
};

const saveTicket = (ticket: any, userOrderID: string) => {
	return addDoc(collection(db, "sold_tickets"), {
		type: ticket.name,
		order: userOrderID,
		validated: false,
	});
};

export const getTicketsByOrder = async (orderId: string): Promise<Array<any> | undefined> => {
	const getTicketsByOrderId = query(ticketCollection,where("order", "==", orderId));
	const data = await getDocs(getTicketsByOrderId);
  const buildedTickets = await buildTickets(data.docs);
	return buildedTickets;
};
const buildTickets = async (tickets: any): Promise<Array<any> | undefined> => {
	return await tickets.map((ticket: any) => ({ ...ticket.data(), id: ticket.id }));
};
