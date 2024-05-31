import { MouseEventHandler, PropsWithChildren } from 'react';

export const variantMap = {
	primary: 'bg-black text-white text-2xl py-3 px-6 rounded-full',
	secondary: 'py-2 px-4 bg-gray-light text-black rounded-2xl',
};

type ButtonProps = PropsWithChildren<{
	onClick: MouseEventHandler<HTMLButtonElement>;
	variant: keyof typeof variantMap;
	className?: string;
	disabled?: boolean;
}>;

const Button = ({
	children,
	onClick,
	variant,
	className = '',
	disabled = false,
}: ButtonProps) => (
	<button
		className={`${variantMap[variant]} ${className}`}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</button>
);

export default Button;
