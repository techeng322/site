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
				<audio ref={audioRef} src={`https://site-ebon-ten.vercel.app/api/v2/play?trackUrl=https://ipfs.io/ipfs/QmUpBsRMrKjiYQhZkWzWkiXcsZT8M6N2m5sF12jPfzucUg/YOU%20RAISE%20ME%20UP.mp3`} className="hidden" />
			)}
		</MusicContext.Provider>
	);
};

export const useMusicProvider = () => useContext(MusicContext);
