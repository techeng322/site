const LoadingState = () => (
	<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
		{Array.from(Array(9).keys()).map((idx) => (
			<li className="space-y-2 animate-pulse " key={idx}>
				<div className="aspect-square w-full bg-gray-light" />
			</li>
		))}
	</ul>
);

export default LoadingState;
