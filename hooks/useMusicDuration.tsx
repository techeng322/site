import { useEffect, useState } from 'react';
import getLink from '@/lib/getLink';

const useMusicDuration = (audioUrl: string) => {
	const [loading, setLoading] = useState(true);
	const [duration, setDuration] = useState<any>(null);

	useEffect(() => {
		const init = async () => {
			try {
				const response = await fetch(getLink(audioUrl));
				const audioContext = new AudioContext();
				const audioBuffer = await audioContext.decodeAudioData(
					await response.arrayBuffer()
				);
				setLoading(false);
				setDuration(audioBuffer?.duration || '');
			} catch (error) {
				setLoading(false);
				setDuration('');
			}
		};

		if (!audioUrl) {
			setLoading(false);
			return;
		}

		init();
	}, [audioUrl]);

	return {
		loading,
		duration,
	};
};

export default useMusicDuration;
