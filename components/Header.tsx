import { PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import SignButton from './SignButton';
import useBalanceOfERC721 from '@/hooks/useBalanceOf';
import { CAPSULE_DROP_ADDRESS } from '@/lib/consts';

export function Header() {
	const { balanceOf } = useBalanceOfERC721({
		contractAddress: CAPSULE_DROP_ADDRESS,
	});
	return (
		<header className="flex justify-between pt-4 md:pt-6 font-size-small">
			<div className="flex items-center gap-6">
				<Logo />
				{balanceOf > 0 && (
					<nav className="flex justify-center">
						<ul>
							<li>
								<NavLink href="/manage">Manage</NavLink>
							</li>
						</ul>
					</nav>
				)}
			</div>
			<div className="flex justify-end items-center">
				<NavLink href="">
					<SignButton />
				</NavLink>
			</div>
		</header>
	);
}

function NavLink(props: PropsWithChildren<LinkProps>) {
	const activePath = useRouter();
	const isActive = activePath.pathname === props.href.toString();
	return (
		<Link
			{...props}
			aria-current={isActive ? 'page' : undefined}
			className={[
				'py-2 px-3 rounded-xl',
				isActive ? 'bg-black text-white' : 'border border-gray-200 text-black',
			].join(' ')}
		/>
	);
}

function Logo() {
	const activePath = useRouter();
	const isActive = activePath.pathname === '/';
	return (
		<Link
			href="/"
			className="flex items-center justify-center h-[72px] w-[72px]"
		>
			<svg
				role="img"
				aria-label="Logo"
				viewBox="0 0 72 72"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`rounded-2xl h-[72px] w-[72px] ${
					isActive ? '' : 'border border-gray-200'
				}`}
			>
				<rect
					width="72"
					height="72"
					rx="20"
					className={isActive ? 'fill-black' : 'fill-white'}
				/>
				<path
					d="M35.2791 16.3263L33.9528 15H29.9738C27.5321 15 25.5527 16.9794 25.5527 19.4211C25.5527 21.8628 27.5321 23.8422 29.9738 23.8422L33.9528 23.8422L35.2791 22.5159V21.8527H35.7213V22.5159L37.0476 23.8422L41.0266 23.8422C43.4683 23.8422 45.4477 21.8628 45.4477 19.4211C45.4477 16.9794 43.4683 15 41.0266 15L37.0476 15L35.7213 16.3263V16.9895H35.2791V16.3263Z"
					className={isActive ? 'fill-white' : 'fill-black'}
				/>
				<path
					d="M15.8263 35.7791L14.5 34.4528L14.5 30.4738C14.5 28.0321 16.4794 26.0527 18.9211 26.0527C21.3628 26.0527 23.3422 28.0321 23.3422 30.4738V34.4528L22.0159 35.7791H21.3527V36.2213H22.0159L23.3422 37.5476V41.5266C23.3422 43.9683 21.3628 45.9477 18.9211 45.9477C16.4794 45.9477 14.5 43.9683 14.5 41.5266V37.5476L15.8263 36.2213H16.4895V35.7791H15.8263Z"
					className={isActive ? 'fill-white' : 'fill-black'}
				/>
				<path
					d="M35.7213 49.4845L37.0476 48.1582H45.0056L46.3319 49.4845V50.1477H46.774V49.4845L48.1003 48.1582H52.0793C54.521 48.1582 56.5004 50.1376 56.5004 52.5793C56.5004 55.021 54.521 57.0004 52.0793 57.0004H48.1003L46.774 55.6741V55.0109H46.3319V55.6741L45.0056 57.0004H37.0476L35.7213 55.6741V55.0109H35.2791V55.6741L33.9528 57.0004H29.9738C27.5321 57.0004 25.5527 55.021 25.5527 52.5793C25.5527 50.1376 27.5321 48.1582 29.9738 48.1582H33.9528L35.2791 49.4845V50.1477H35.7213V49.4845Z"
					className={isActive ? 'fill-white' : 'fill-black'}
				/>
				<path
					d="M56.5004 30.4738C56.5004 32.9155 54.521 34.8949 52.0793 34.8949C49.6376 34.8949 47.6582 32.9155 47.6582 30.4738C47.6582 28.0321 49.6376 26.0527 52.0793 26.0527C54.521 26.0527 56.5004 28.0321 56.5004 30.4738Z"
					className={isActive ? 'fill-white' : 'fill-black'}
				/>
			</svg>
		</Link>
	);
}
