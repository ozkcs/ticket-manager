import { collection, doc, getDoc, addDoc, getDocs, query } from "@firebase/firestore";
import { db } from "./firebaseService";
import dayjs from "dayjs";
import { async } from "@firebase/util";
import { TEvents } from "../types/ticket";

const eventsCollectionRef = collection(db, "events");

export const getEvents = async () :Promise<Array<TEvents> | undefined>=> {
	try {
    // const eventQuery = query(eventsCollectionRef)
		const fetchedEvents = await getDocs(eventsCollectionRef);
    return await buildEvents(fetchedEvents);
		
	} catch (e) {
		console.log(e)
	}
};

const buildEvents = async ( events: any ): Promise<Array<TEvents> | undefined> => {
	return await events.docs.map((event: any) => ({ ...event.data(), id: event.id }));
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
