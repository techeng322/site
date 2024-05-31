import { useContext, createContext, useMemo } from 'react';
import useTrackData from '@/hooks/useTrackData';

const TrackContext = createContext(null as any);

export const TrackProvider = ({ children, data, inCapsule = false }: any) => {
	const trackData = useTrackData(data, inCapsule);

	const providerValue = useMemo(
		() => ({
			track: data,
			...trackData,
		}),
		[data, trackData]
	);

	return (
		<TrackContext.Provider value={providerValue}>
			{children}
		</TrackContext.Provider>
	);
};

export const useTrackProvider = () => useContext(TrackContext);
