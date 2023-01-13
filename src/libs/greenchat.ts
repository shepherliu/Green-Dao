// example imports 
import { providers, utils, Contract } from "ethers"

import { greenChatContractAddress } from "../constant"

import {networkConnect, connectState} from "./connect"

import { connectFluence } from "./fluence"

import * as w3name from "./w3name"
import * as crypto from "./crypto"
import * as tools from "./tools"

const abi = [
	"function updateKeys(string publicKey, string privateKey) public",
	"function getPublicKey(address to) public view returns (string)",
	"function getPrivateKey(address to) public view returns (string)",
	"function getPeerList(uint pageSize, uint pageCount) public view returns (address[], string[], string[])",
];

export class GreenChat {
	private contractAddress: string;

	constructor(contractAddress:string = ''){
		this.contractAddress = contractAddress;
	}

	private getContract = async () => {
		await networkConnect();

		return new Contract(this.getAddress(), abi, connectState.signer);		
	}	

	public getAddress = () => {
		if(this.contractAddress != ''){
			return this.contractAddress;
		}else{
			return (greenChatContractAddress as any)[connectState.chainId];
		}
	}	

	public updateKeys = async () => {

		if(connectState.fluenceId === ''){
			const fluenceId = await connectFluence();

			if(fluenceId === undefined || fluenceId === null || fluenceId === ''){
				throw new Error("connect to fluence failed!");
			}else{
				connectState.fluenceId = fluenceId;
			}
		}

		let privateKey = null;
		try{
			privateKey = await crypto.decryptPasswordWithWallet(JSON.parse(await this.getPrivateKey(connectState.userAddr.value)));
		}catch(e){
			privateKey = null;
		}

		let name = await w3name.parseFrom(privateKey);
		if(name === null){
			name = await w3name.createNewName();
		}

		let jsonData;
		try{
			jsonData = JSON.parse(await w3name.resolveName(name));
		}catch(e){
			jsonData = {fluenceId: connectState.fluenceId};
		}

		jsonData.fluenceId = connectState.fluenceId;

		name = await w3name.updateName(name, JSON.stringify(jsonData));
		if(name === null){
			return '';
		}

		//if keys change then update to smart contract
		const publicKey = await this.getPublicKey(connectState.userAddr.value);
		if(publicKey !== name.toString()){
			const newKey = await crypto.encryptPasswordWithWallet(tools.uint8ToString(name.key.bytes));

			if(newKey === null || newKey.sign_data === null || newKey.sign_data === '' || newKey.signature === null || newKey.signature === ''){
			return '';
			}

			const contract = await this.getContract();
			const tx = await contract.updateKeys(name.toString(), JSON.stringify(newKey));
			await tx.wait();
			return tx.hash;
		}

		return 'success';
	}

	public getPublicKey = async (to:string) => {
		to = to.trim();
		if(to.length === 0){
			throw new Error("invalid address to!");
		}

		const contract = await this.getContract();

		return await contract.getPublicKey(to);
	}

	public getPrivateKey = async (to:string) => {
		to = to.trim();
		if(to.length === 0){
			throw new Error("invalid address to!");
		}

		const contract = await this.getContract();

		return await contract.getPrivateKey(to);
	}	

	public getPeerList = async (pageSize:number, pageCount:number) => {
		if(pageSize <= 0 || pageSize > 100){
			throw new Error("invalid page size!");
		}

		if(pageCount < 0){
			throw new Error("invalid page count!");
		}

		const contract = await this.getContract();

		const res = await contract.getPeerList(pageSize, pageCount);

		const peerList = new Array();

		for(const i in res[0]){
			const address = res[0][i].toLowerCase();

			peerList.push({
				address: address,
				publicKey: res[1][i],
				privateKey: res[2][i],
				isOwner: address === connectState.userAddr.value.toLowerCase(),
				isOffline: res[1][i] === '',
			});
		}

		return peerList;
	}
}