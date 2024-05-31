const formatTime = (time: any) => {
	if (!time || time === 'undefined') return '';
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default formatTime;
