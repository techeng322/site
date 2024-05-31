import { motion } from 'framer-motion';
import Icon from '@/shared/Icon/index';

const Spinner = () => {
	return (
		<motion.div
			animate={{ rotate: 360 }}
			className="w-[20px] aspect-square"
			transition={{
				duration: 2,
				repeat: Infinity,
				repeatType: 'loop',
				ease: 'linear',
			}}
		>
			<Icon name="spinner" size={20} />
		</motion.div>
	);
};

export default Spinner;
