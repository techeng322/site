import { useContext, createContext } from 'react';
import useMusic from '@/hooks/useMusic';

const MusicContext = createContext(null as any);

export const MusicProvider = ({ children }: any) => {
	const {
		activeTrackSrc,
		audioRef,
		playTrack,
		pauseTrack,
		isPlaying,
		activeTrackId,
		togglePlay,
	} = useMusic();

	return (
		<MusicContext.Provider
			value={{
				playTrack,
				pauseTrack,
				isPlaying,
				activeTrackId,
				togglePlay,
			}}
		>
			{children}
			{activeTrackSrc && (
				<audio ref={audioRef} src={activeTrackSrc} className="hidden" />
			)}
		</MusicContext.Provider>
	);
};

export const useMusicProvider = () => useContext(MusicContext);
