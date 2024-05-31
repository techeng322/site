import { useContext, createContext, useMemo } from 'react';
import useCapsuleTracks from '@/hooks/useCapsuleTracks';
import useSmartWalletV3 from '@/hooks/useV3SmartWallet';

const CapsuleContext = createContext(null as any);

export const CapsuleProvider = ({ capsuleId, children }: any) => {
	const capsule = useSmartWalletV3(capsuleId);
	const capsuleTracks = useCapsuleTracks(capsule?.capsuleAddress);

	const providerValue = useMemo(
		() => ({
			...capsule,
			capsuleId,
			...capsuleTracks,
		}),
		[capsule, capsuleId, capsuleTracks]
	);

	return (
		<CapsuleContext.Provider value={providerValue}>
			{children}
		</CapsuleContext.Provider>
	);
};

export const useCapsuleProvider = () => useContext(CapsuleContext);
