import { Icons } from './resolvers';

export type IconsType = keyof typeof Icons;

interface IIcon {
	name: IconsType;
	size: number;
	className?: string;
	color?: string;
}

const Icon = ({ name, size, className, color }: IIcon) => {
	const IconSVG = Icons[name];

	return <IconSVG size={size} className={className} color={color} />;
};

const defaultProps: Partial<IIcon> = {
	size: 25,
};

Icon.defaultProps = defaultProps;

export default Icon;
