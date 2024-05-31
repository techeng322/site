import { PropsWithChildren } from 'react';
import { variantMap } from '../Button/Button';

type ButtonLinkProps = PropsWithChildren<{
	href?: string;
	variant: keyof typeof variantMap;
	className?: string;
	target?: '_blank' | '_self';
}>;

const ButtonLink = ({
	children,
	href,
	variant,
	className = '',
	target = '_self',
}: ButtonLinkProps) => (
	<a
		className={`inline-block ${variantMap[variant]} ${className}`}
		href={href}
		target={target}
	>
		{children}
	</a>
);

export default ButtonLink;
