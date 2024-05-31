import { useEffect, useMemo, useState } from 'react';
import { Contract } from 'ethers';
import isDeployedContract from '../lib/isDeployedContract';
import registryAbi from '../lib/abi/ERC6551-registry.json';
import accountAbi from '../lib/abi/ERC6551-account.json';
import {
	ACCOUNT_IMPLEMENTATION,
	ACCOUNT_PROXY,
	CHAIN_ID,
	REGISTRY_ADDRESS,
	SALT_BYTES,
} from '../lib/consts';
import handleTxError from '../lib/handleTxError';
import getSmartWallet from '@/lib/getSmartWallet';
import usePrivyEthersSigner from './usePrivyEthersSigner';

const useSmartWalletV3 = (capsuleId: number) => {
	const [capsuleAddress, setCapsuleAddress] = useState('');
	const [isRegistered, setIsRegistered] = useState(null);
	const { signer } = usePrivyEthersSigner();
	const registryContract = useMemo(
		() => new Contract(REGISTRY_ADDRESS, registryAbi, signer),
		[signer]
	);
	const tbaContract = useMemo(
		() => capsuleAddress && new Contract(capsuleAddress, accountAbi, signer),
		[capsuleAddress, signer]
	) as any;

	useEffect(() => {
		const init = async () => {
			let response = await getSmartWallet(capsuleId);
			setCapsuleAddress(response);
			response = await isDeployedContract(response);
			setIsRegistered(response);
		};
		if (!capsuleId) {
			setCapsuleAddress('');
			return;
		}
		init();
	}, [capsuleId]);

	const createAccount = async () => {
		try {
			const tx = await registryContract.createAccount(
				ACCOUNT_PROXY,
				SALT_BYTES,
				CHAIN_ID,
				process.env.NEXT_PUBLIC_DROP,
				capsuleId
			);
			const response = await tx.wait();
			return response;
		} catch (err) {
			handleTxError(err);
			return false;
		}
	};

	const initialize = async () => {
		try {
			const tx = await tbaContract.initialize(ACCOUNT_IMPLEMENTATION);
			const response = await tx.wait();
			return response;
		} catch (e) {
			handleTxError(e);
			return false;
		}
	};

	return {
		createAccount,
		initialize,
		isRegistered,
		capsuleAddress,
		tbaContract,
	};
};

export default useSmartWalletV3;
