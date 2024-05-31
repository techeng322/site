const Quantity = ({ totalSupply, setQuantity, quantity }: any) => (
	<div className="flex justify-between">
		<div className="space-y-1">
			<span className="block font-size-small">Collected</span>
			<span className="block font-size-text text-black">
				{totalSupply} / 10000
			</span>
		</div>
		<div className="flex items-center">
			<button
				type="button"
				aria-label="Decrement quantity"
				className="inline-block bg-gray-light text-black font-size-text rounded-xl w-12 h-12 items-center justify-center"
				onClick={() => setQuantity((q: any) => (q === 1 ? 1 : q - 1))}
			>
				-
			</button>
			<span className="w-12 text-center font-size-text text-black">
				{quantity}
			</span>
			<button
				type="button"
				aria-label="Increment quantity"
				className="inline-block bg-gray-light text-black font-size-text rounded-xl w-12 h-12 items-center justify-center"
				onClick={() => setQuantity((q: any) => q + 1)}
			>
				+
			</button>
		</div>
	</div>
);

export default Quantity;
