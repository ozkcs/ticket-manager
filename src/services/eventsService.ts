import { collection, doc, getDoc, addDoc, getDocs } from "@firebase/firestore";
import { db } from "./firebaseService";
import dayjs from "dayjs";
import { async } from "@firebase/util";

const eventsCollectionRef = collection(db, "events");

export const getEvents = async () => {
	try {
		const data = await getDocs(eventsCollectionRef);
		data.docs.length && data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	} catch (e) {
		console.log(e)
	}
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
