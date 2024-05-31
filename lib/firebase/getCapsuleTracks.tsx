import { doc, getDoc } from 'firebase/firestore';
import { db } from './db';

export const getCapsuleTracks = async (capsuleAddress: string) => {
	const docRef = doc(db, 'capsules', capsuleAddress.toLowerCase());
	const docSnap = await getDoc(docRef);
	return docSnap.exists() && docSnap.data().tracks;
};
