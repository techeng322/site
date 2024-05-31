import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: 'capsules-a8a0d.firebaseapp.com',
	projectId: 'capsules-a8a0d',
	storageBucket: 'capsules-a8a0d.appspot.com',
	messagingSenderId: '811565008044',
	appId: '1:811565008044:web:a3cdf42f5ddd4c126fcb09',
	measurementId: 'G-9KVM3PEQT0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
