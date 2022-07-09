// example imports 
import { providers, utils, Contract } from "ethers"

import {networkConnect, connectState} from "./connect"

const abi = [
	"function name() public view returns (string)",
	"function symbol() public view returns (string)",
	"function decimals() public view returns (uint8)",
	"function totalSupply() public view returns (uint256)",
	"function balanceOf(address owner) public view returns (uint256)",
	"function approve(address to, uint256 amount) public returns (bool)",
	"function allowance(address owner, address spender) public view returns (uint256)",
	"function safeTransferFrom(address from, address to, uint256 amount) public returns (bool)",
	"function transferFrom(address from, address to, uint256 amount) public returns (bool)",
	"function transfer(address to, uint256 amount) public returns (bool)",
	"function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
	"function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool)"
];


export class ERC20 {
	private contractAddress: string;

	constructor(contractAddress:string){
		this.contractAddress = contractAddress;
	}

	private getContract = async () => {
		await networkConnect();

		return new Contract(this.contractAddress, abi, connectState.signer);
	}

	public name = async () => {
		const contract = await this.getContract();

		return await contract.name();
	}

	public symbol = async () => {
		const contract = await this.getContract();

		return await contract.symbol();
	}

	public decimals = async () => {
		const contract = await this.getContract();

		const res = await contract.decimals();

		return res.toNumber();
	}

	public totalSupply = async () => {
		const contract = await this.getContract();

		const res = await contract.totalSupply();

		return Number(utils.formatUnits(res, await this.decimals()));
	}

	public balanceOf = async (address:string) => {
		const contract = await this.getContract();

		const res = await contract.balanceOf(address);

		return Number(utils.formatUnits(res, await this.decimals()));
	}

	public approve = async (address:string, amount:number) => {
		const contract = await this.getContract();

		const tx = await contract.approve(address, utils.parseUnits(String(amount), await this.decimals()));

		await tx.wait();

		return tx.hash;
	}

	public allowance = async (owner:string, spender:string) => {
		const contract = await this.getContract();

		const res = await contract.allowance(owner, spender);

		return Number(utils.formatUnits(res, await this.decimals()));
	}

	public safeTransferFrom = async (from:string, to:string, amount:number) => {
		const contract = await this.getContract();

		const tx = await contract.safeTransferFrom(from, to, utils.parseUnits(String(amount), await this.decimals()));

		await tx.wait();

		return tx.hash;		
	}

	public transferFrom = async (from:string, to:string, amount:number) => {
		const contract = await this.getContract();

		const tx = await contract.transferFrom(from, to, utils.parseUnits(String(amount), await this.decimals()));

		await tx.wait();

		return tx.hash;		
	}

	public transfer = async (to:string, amount:number) => {
		const contract = await this.getContract();

		const tx = await contract.transfer(to, utils.parseUnits(String(amount), await this.decimals()));

		await tx.wait();

		return tx.hash;		
	}

	public increaseAllowance = async (spender:string, amount:number) => {
		const contract = await this.getContract();

		const tx = await contract.increaseAllowance(spender, utils.parseUnits(String(amount), await this.decimals()));

		await tx.wait();

		return tx.hash;				
	}

	public decreaseAllowance = async (spender:string, amount:number) => {
		const contract = await this.getContract();

		const tx = await contract.decreaseAllowance(spender, utils.parseUnits(String(amount), await this.decimals()));

		await tx.wait();

		return tx.hash;				
	}	
}
