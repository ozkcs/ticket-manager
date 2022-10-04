import { collection, getDocs, doc, setDoc, addDoc } from "@firebase/firestore";
import { db } from "./firebaseService";
import dayjs from "dayjs";

const eventsCollectionRef = collection(db, "events");
export const getEvents = async () => {
	const data = await getDocs(eventsCollectionRef);
	return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const postEvents = async () => {
	console.log("posting..");
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
				cantLeft: 25,
				price: 5000,
			},
			{
				name: "VIP",
				cantLeft: 15,
				price: 5000,
			},
			{
				name: "DELUXE",
				cantLeft: 20,
				price: 5000,
			},
		],
	});
	await console.log("posted");
};
