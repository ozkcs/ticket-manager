import { collection, getDocs } from "@firebase/firestore";
import { db } from "./firebaseService";

const eventsCollectionRef = collection(db, "events");

export const getEvents = async () => {
  const data = await getDocs(eventsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};