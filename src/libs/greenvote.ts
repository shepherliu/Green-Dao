// example imports 
import { providers, utils, Contract } from "ethers"

import { greenVoteContractAddress } from "../constant"

import {networkConnect, connectState} from "./connect"

import { ERC20 } from "./erc20"

const abi = [
	"function isApprovedForAll(address owner, address operator) public view returns (bool)",
	"function name() public view returns (string)",
	"function symbol() public view returns (string)",
	"function ownerOf(uint256 tokenId) public view returns (address)",
	"function tokenByIndex(uint256 index) public view returns (uint256)",
	"function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
	"function tokenURI(uint256 tokenId) public view returns (string)",
	"function totalSupply() public view returns (uint256)",
	"function balanceOf(address owner) public view returns (uint256)",
	"function approve(address to, uint256 tokenId) public returns (bool)",
	"function getApproved(uint256 tokenId) public view returns (address)",
	"function safeTransferFrom(address from, address to, uint256 tokenId) public returns (bool)",
	"function transferFrom(address from, address to, uint256 tokenId) public returns (bool)",
	"function setApprovalForAll(address operator, bool approved) public returns (bool)",
	"function updateContracts(address dao) public returns (bool)",
	"function addDaoTreassure(uint256 daoId, address from, address token, uint256 amount) public payable returns (bool)",
	"function mint(string memory name, string memory desc, uint256 daoId, uint256 value, address token, address to, uint endTime) public returns (uint256)",
	"function burn(uint256 voteId) public returns (bool)",
	"function updateVote(uint256 voteId, string memory name, string memory desc, uint endTime) public returns (bool)",
	"function vote(uint256 voteId, VoteStatus status) public returns (bool)",
	"function getDaoTreassure(uint256 daoId, address token) public view returns (uint256)",
	"function getVoteTotalCount(bool onlyOwner) public view returns (uint)",
	"function getVoteInfoById(uint256 voteId) public view returns (VoteInfo memory)",
	"function getVoteIndexsByPageCount(uint pageSize, uint pageCount, uint256 daoId, bool onlyOwner) public view returns(uint256[] memory)",
];

const zeroAddress = '0x0000000000000000000000000000000000000000';

export class GreenVote {
	private contractAddress: string;

	constructor(contractAddress:string = (greenVoteContractAddress as any)[connectState.chainId]){
		this.contractAddress = contractAddress;
	}

	private getContract = async () => {
		await networkConnect();

		return new Contract(this.contractAddress, abi, connectState.signer);		
	}	

	public isApprovedForAll = async (owner:str, operator:str) => {
		const contract = await this.getContract();

		return await contract.isApprovedForAll(owner, operator);
	}

	public name = async () => {
		const contract = await this.getContract();

		return await contract.name();
	}

	public symbol = async () => {
		const contract = await this.getContract();

		return await contract.symbol();
	}

	public totalSupply = async () => {
		const contract = await this.getContract();

		const res = await contract.totalSupply();

		return res.toNumber();
	}

	public balanceOf = async (address:str) => {
		const contract = await this.getContract();

		const res = await contract.balanceOf(address);

		return res.toNumber();
	}

	public ownerOf = async (tokenId:number) => {
		const contract = await this.getContract();

		return await contract.ownerOf(tokenId);
	}

	public tokenByIndex = async (index:number) => {
		const contract = await this.getContract();

		res = await contract.tokenByIndex(index);

		return res.toNumber();
	}

	public tokenOfOwnerByIndex = async (owner:str, index) => {
		const contract = await this.getContract();

		res = await contract.tokenOfOwnerByIndex(owner, index);

		return res.toNumber();
	}

	public tokenURI = async (tokenId:number) => {
		const contract = await this.getContract();

		return await contract.tokenURI(tokenId);
	}

	public approve = async (to:str, tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.approve(to, tokenId);

		await tx.wait();

		return tx.hash;
	}

	public getApproved = async (tokenId:number) => {
		const contract = await this.getContract();

		return await contract.getApproved(tokenId);
	}

	public safeTransferFrom = async (from:str, to:str, tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.safeTransferFrom(from, to, tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public transferFrom = async (from:str, to:str, tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.transferFrom(from, to, tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public setApprovalForAll = async (operator:str, approved:boolean) => {
		const contract = await this.getContract();

		const tx = await contract.setApprovalForAll(operator, approved);

		await tx.wait();

		return tx.hash;		
	}	

	public updateContracts = async (dao:str) => {
		const contract = await this.getContract();

		const tx = await contract.updateContracts(dao);

		await tx.wait();

		return tx.hash;			
	} 

	public addDaoTreassure = async (daoId:number, from:str, token:str, amount:number) => {
		const contract = await this.getContract();

		let value;

		if(token === zeroAddress){
			value = utils.parseEther(String(amount));
		}else{
			const erc20 = new ERC20(token);
			value = utils.parseUnits(String(amount), await erc20.decimals());
		}

		const tx = await contract.addDaoTreassure(daoId, from, token, value);

		await tx.wait();

		return tx.hash;			
	}

	public mint = async (name:str, desc:str, daoId:number, amount:number, token:str, to:str, endTime:number) => {
		const contract = await this.getContract();

		let value;

		if(token === zeroAddress){
			value = utils.parseEther(String(amount));
		}else{
			const erc20 = new ERC20(token);
			value = utils.parseUnits(String(amount), await erc20.decimals());
		}

		const tx = await contract.mint(name, desc, daoId, value, token, to, endTime);

		await tx.wait();

		return tx.hash;				
	}

	public burn = async (voteId:number) => {
		const contract = await this.getContract();

		const tx = await contract.burn(voteId);

		await tx.wait();

		return tx.hash;
	}

	public updateVote = async (voteId:number, name:str, desc:str, endTime:number) => {
		const contract = await this.getContract();

		const tx = await contract.updateVote(voteId, name, desc, endTime);

		await tx.wait();

		return tx.hash;		
	}

	public vote = async (voteId:number, status:number) => {
		const contract = await this.getContract();

		const tx = await contract.vote(voteId, status);

		await tx.wait();

		return tx.hash;		
	}

	public getDaoTreassure = async (daoId:number, token:str) => {
		const contract = await this.getContract();

		const res = await contract.getDaoTreassure(daoId, token);

		if(token === zeroAddress){
			return Number(utils.formatEther(res));
		}else{
			const erc20 = new ERC20(token);
			return Number(utils.formatUnits(res, await erc20.decimals()));
		}
	}

	public getVoteTotalCount = async (onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getVoteTotalCount(onlyOwner);

		return res.toNumber();
	}

	//todo parse vote info
	public getVoteInfoById = async (voteId:number) => {
		const contract = await this.getContract();

		const res = await contract.getVoteInfoById(voteId);

		return res;
	}

	public getVoteIndexsByPageCount => async (pageSize:number, pageCount:number, daoId:number, onlyOwner:boolean) => {
		const contract = await this.getContract();

		const indexList = [];

		const res = await contract.getVoteIndexsByPageCount(pageSize, pageCount, daoId, onlyOwner);

		for(const i in res){
			indexList.push(res[i].toNumber());
		}

		return indexList;
	}
}