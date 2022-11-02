import { collection, doc, getDoc, addDoc, getDocs } from "@firebase/firestore";
import { db } from "./firebaseService";
import dayjs from "dayjs";
import { async } from "@firebase/util";

const eventsCollectionRef = collection(db, "events");

export const getEvents = async () => {
	const data = await getDocs(eventsCollectionRef);
	return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const buyTickets = async (useInfo: any, eventInfo: any) => {
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

		const savedTickets = await Promise.all(promisesBuffer);
		return {
			userOrderID: userOrder.id,
			tickets: savedTickets.map((ticket: any) => ({
				...ticket.data(),
				id: ticket.id,
			})),
		};
	} catch (err) {
		console.log(err);
	}
};

const saveTicket = async (ticket: any, userOrderID: string) => {
	const savedDoc = await addDoc(collection(db, "sold_tickets"), {
		type: ticket.name,
		order: userOrderID,
		validated: false,
	});
	return getDoc(doc(db, "sold_tickets", savedDoc.id));
};

export const postEvents = async () => {
	await addDoc(collection(db, "events"), {
		name: "Secrets Event",
		location: "Salon El Prado",
		// TODO: Search for compatible date format
		// dates: [
		//   dayjs().add(7, 'day'),
		//   dayjs().add(8, 'day'),
		//   dayjs().add(9, 'day'),
		// ],
		ticketTypes: [
			{
				name: "Standard",
				quantityLeft: 25,
				price: 5000,
			},
			{
				name: "VIP",
				quantityLeft: 15,
				price: 5000,
			},
			{
				name: "DELUXE",
				quantityLeft: 20,
				price: 5000,
			},
		],
	});
};
