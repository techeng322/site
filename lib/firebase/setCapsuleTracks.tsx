import { doc, setDoc } from 'firebase/firestore';
import { db } from './db';
import { Track } from '@/lib/types';

const setCapsuleTracks = async (capsuleAddress: string, tracks: Track[]) => {
	const docRef = doc(db, 'capsules', capsuleAddress.toLowerCase());

	await setDoc(
		docRef,
		{
			tracks,
		},
		{ merge: true }
	);
};

export default setCapsuleTracks;
