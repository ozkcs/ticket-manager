// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDx1RJvSep8HY1dhBnXbiiL1G8laaCAtvY",
	authDomain: "ticket-manager-e1607.firebaseapp.com",
	projectId: "ticket-manager-e1607",
	storageBucket: "ticket-manager-e1607.appspot.com",
	messagingSenderId: "707982457751",
	appId: "1:707982457751:web:3311c0033fbff7c92f62d2",
	measurementId: "G-6QTH1BX841",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);
