import {
	collection,
	doc,
	setDoc,
	getDoc,
	addDoc,
	getDocs,
	query,
	where,
} from "@firebase/firestore";
import { db } from "./firebaseService";
import { TTicket } from "../types/ticket";

const ticketCollection = collection(db, "sold_tickets");
const ordersCollection = collection(db, "user_orders");

export const buyTickets = async (
	useInfo: any,
	eventInfo: any
): Promise<string | undefined> => {
	try {
		const promisesBuffer: any = [];

		const userOrder = await addDoc(ordersCollection, {
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

export const getOrders = async () => {
	const data = await getDocs(ordersCollection);
	return await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getTicketsByOrder = async ( orderId: string ): Promise<Array<TTicket> | undefined> => {
	const getTicketsByOrderId = query(ticketCollection,where("order", "==", orderId));
	const data = await getDocs(getTicketsByOrderId);
	const buildedTickets = await buildTickets(data.docs);
	return buildedTickets;
};

const buildTickets = async ( tickets: any ): Promise<Array<TTicket> | undefined> => {
	return await tickets.map((ticket: any) => ({ ...ticket.data(), id: ticket.id }));
};

export const markTicketAsUsed = async ( id: string ): Promise<TTicket | undefined> => {
	const ticketRef = doc(db, "sold_tickets", id);
	await setDoc(ticketRef, { validated: true }, { merge: true });
	const ticketUpdated = await getDoc(ticketRef);
	return buildTicket(ticketUpdated);
};

const buildTicket = async (ticket: any): Promise<TTicket | undefined> => {
	return {
		...ticket.data(),
		id: ticket.id,
	};
};