import { useEffect, useRef, useState } from 'react';
import { Track } from '@/lib/types';
import getTrackId from '@/lib/getTrackId';
import getLink from '@/lib/getLink';
import { gateways } from '@/lib/consts';

const useMusic = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [activeTrackSrc, setActiveTrackSrc] = useState<string>();
	const [activeTrackId, setActiveTrackId] = useState<string>();
	const [gateway, setGateway] = useState(0);
	const [activeTrack, setActiveTrack] = useState<Track | null>(null);

	function playTrack() {
		setIsPlaying(true);
	}

	function pauseTrack() {
		setIsPlaying(false);
	}

	const togglePlay = (track: Track) => {
		const trackActive = activeTrackId === getTrackId(track);
		if (!trackActive) {
			const audioUrl = getLink(track.meta.animationUrl, 0) as string;
			setActiveTrackSrc(audioUrl);
			setActiveTrackId(getTrackId(track));
			setGateway(0);
			setActiveTrack(track);
		}
		if (isPlaying && trackActive) {
			pauseTrack();
			return;
		}
		playTrack();
	};

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const gatewayFb = async (gate: number) => {
			if (!activeTrack || gate > gateways.length - 1) return;
			const newUrl = getLink(activeTrack.meta.animationUrl, gate + 1) as string;
			setGateway(gate + 1);
			setActiveTrackSrc(newUrl);
		};
		if (activeTrackSrc && audioRef.current && isPlaying) {
			audioRef.current.src = activeTrackSrc;
			audioRef.current.addEventListener('error', () => gatewayFb(gateway));
		}
		if (isPlaying) {
			audioRef.current?.play();
		} else {
			audioRef.current?.pause();
		}

		return () =>
			audioRef.current?.removeEventListener('error', () => gatewayFb(gateway));
	}, [activeTrackSrc, isPlaying, activeTrack, gateway]);

	return {
		audioRef,
		togglePlay,
		playTrack,
		pauseTrack,
		isPlaying,
		activeTrackSrc,
		activeTrackId,
	};
};

export default useMusic;
