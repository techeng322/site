import toast from 'react-hot-toast';

const updateToast = (toastId: string, text: string) => {
	toast(text, {
		id: toastId,
	});
};

export default updateToast;
