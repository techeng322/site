import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

export function Footer() {
	return (
		<footer className="flex justify-between pb-8 pt-24 font-size-small">
			<nav>
				<ul className="flex gap-5">
					<li>
						<NavLink href={process.env.NEXT_PUBLIC_TWITTER!}>Follow</NavLink>
					</li>
					<li>
						<NavLink href={process.env.NEXT_PUBLIC_OPENSEA!}>OpenSea</NavLink>
					</li>
					<li>
						<NavLink href="/about">About</NavLink>
					</li>
				</ul>
			</nav>
			<span>for club use only</span>
		</footer>
	);
}

function NavLink(props: PropsWithChildren<LinkProps>) {
	const activePath = useRouter();
	const isActive = activePath.pathname.startsWith(props.href.toString());
	return (
		<Link
			{...props}
			aria-current={isActive ? 'page' : undefined}
			className={[isActive ? 'text-black' : ''].join(' ')}
		/>
	);
}
