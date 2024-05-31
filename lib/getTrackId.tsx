import { Track } from './types';

const getTrackId = (track: Track) => {
	return JSON.stringify(track);
};

export default getTrackId;
