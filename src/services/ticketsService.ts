import {
	collection,
	doc,
	setDoc,
	getDoc,
	addDoc,
	getDocs,
	query,
	where,
	serverTimestamp,
} from "@firebase/firestore";
import { db } from "./firebaseService";
import { TTicket } from "../types/ticket";
import { TOrder } from "../types/Order";
import { dateDiff } from "../utils/dateHelper";

const ticketCollection = collection(db, "sold_tickets");
const ordersCollection = collection(db, "user_orders");

export const buyTickets = async (
	useInfo: any,
	eventInfo: any,
	totalPayed: number
): Promise<string | undefined> => {
	try {
		const promisesBuffer: any = [];

		const userOrder = await addDoc(ordersCollection, {
			...useInfo,
			eventId: eventInfo.id,
			totalPayed: totalPayed,
			purchaseDate: serverTimestamp(),
		});

		eventInfo.aquiredTickets.forEach((ticket: any) => {
			for (let quantityPerType = 0; quantityPerType < ticket.quantity; quantityPerType++) {
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
		...ticket,
		order: userOrderID,
		validated: false,
	});
};

export const getOrders = async (): Promise<Array<TOrder> | undefined> => {
	const data = await getDocs(ordersCollection);
	const buildedOrders = await data.docs.map((doc: any) => ({
		...doc.data(),
		id: doc.id,
	}));

	await buildedOrders.sort(
		(orderA: TOrder, orderB: TOrder) => dateDiff(orderA.purchaseDate, orderB.purchaseDate)
	);
	return buildedOrders;
};

export const getTicketsByOrder = async (
	orderId: string | undefined
): Promise<Array<TTicket> | undefined> => {
	if (orderId) {
		const getTicketsByOrderId = query(ticketCollection, where("order", "==", orderId));
		const data = await getDocs(getTicketsByOrderId);
		const buildedTickets = await buildTickets(data.docs);
		return buildedTickets;
	}
};

export const getAllTicketsSorted = async (): Promise<Array<any> | undefined> => {
	const data = await getDocs(ticketCollection);
	const buildedTickets = await buildTickets(data.docs);
	const result = buildedTickets?.reduce((acc: any, ticket) => {
		acc[ticket.order] = acc[ticket.order] || [];
		acc[ticket.order].push(ticket);
		return acc;
	}, Object.create(null));
	return result;
};

const buildTickets = async (tickets: any): Promise<Array<TTicket> | undefined> => {
	return await tickets.map((ticket: any) => ({
		...ticket.data(),
		id: ticket.id,
	}));
};

export const markTicketAsUsed = async (id: string): Promise<TTicket | undefined> => {
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

export const getOrder = async (id: string | undefined): Promise<TOrder | undefined> => {
	if (id) {
		const orderRef = doc(db, "user_orders", id);
		const order = await getDoc(orderRef);
		return {
			id: order.id,
			email: order.data()?.email,
			eventId: order.data()?.eventId,
			first_name: order.data()?.first_name,
			last_name: order.data()?.last_name,
			phone: order.data()?.phone,
			totalPayed: order.data()?.totalPayed,
			purchaseDate: order.data()?.purchaseDate,
		};
	}
};
