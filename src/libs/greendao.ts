// example imports 
import { providers, utils, Contract } from "ethers"

import { greenDaoContractAddress } from "../constant"

import {networkConnect, connectState} from "./connect"

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
	"function mint(string name, string desc, string website, string url, bool isPublic) public returns (uint256)",
	"function burn(uint256 tokenId) public returns (bool)",
	"function joinDao(uint256 daoId, address user) public returns (bool)",
	"function leaveDao(uint256 daoId, address user) public returns (bool)",
	"function setDaoPublic(uint256 daoId, bool isPublic) public returns (bool)",
	"function updateDao(uint256 daoId, string name, string desc, string website, string url)",
	"function checkInDao(uint256 daoId, address user) public view returns (bool)",
	"function getDaoIndexsByPageCount(uint256 pageSize, uint256 pageCount, bool onlyOwner) public view returns (uint256[])",
	"function getDaoInfoById(uint256 daoId) public view returns (DaoInfo)",
	"function getDaoMembers(uint256 daoId) public view returns (uint)",
	"function getDaoTotalCount(bool onlyOwner) public view returns (uint)",
];


export class GreenDao {
	private contractAddress: string;

	constructor(contractAddress:string = (greenDaoContractAddress as any)[connectState.chainId]){
		this.contractAddress = contractAddress;
	}

	private getContract = async () => {
		await networkConnect();

		return new Contract(this.contractAddress, abi, connectState.signer);		
	}	

	public isApprovedForAll = async (owner:string, operator:string) => {
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

	public balanceOf = async (address:string) => {
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

		const res = await contract.tokenByIndex(index);

		return res.toNumber();
	}

	public tokenOfOwnerByIndex = async (owner:string, index:number) => {
		const contract = await this.getContract();

		const res = await contract.tokenOfOwnerByIndex(owner, index);

		return res.toNumber();
	}

	public tokenURI = async (tokenId:number) => {
		const contract = await this.getContract();

		return await contract.tokenURI(tokenId);
	}

	public approve = async (to:string, tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.approve(to, tokenId);

		await tx.wait();

		return tx.hash;
	}

	public getApproved = async (tokenId:number) => {
		const contract = await this.getContract();

		return await contract.getApproved(tokenId);
	}

	public safeTransferFrom = async (from:string, to:string, tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.safeTransferFrom(from, to, tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public transferFrom = async (from:string, to:string, tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.transferFrom(from, to, tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public setApprovalForAll = async (operator:string, approved:boolean) => {
		const contract = await this.getContract();

		const tx = await contract.setApprovalForAll(operator, approved);

		await tx.wait();

		return tx.hash;		
	}	

	public mint = async (name:string, desc:string, website:string, url:string, isPublic:boolean) => {
		const contract = await this.getContract();

		const tx = await contract.mint(name, desc, website, url, isPublic);

		await tx.wait();

		return tx.hash;			
	}

	public burn = async (tokenId:number) => {
		const contract = await this.getContract();

		const tx = await contract.burn(tokenId);

		await tx.wait();

		return tx.hash;		
	}

	public joinDao = async (daoId:number, user:string) => {
		const contract = await this.getContract();

		const tx = await contract.joinDao(daoId, user);

		await tx.wait();

		return tx.hash;			
	}

	public leaveDao = async (daoId:number, user:string) => {
		const contract = await this.getContract();

		const tx = await contract.leaveDao(daoId, user);

		await tx.wait();

		return tx.hash;			
	}

	public setDaoPublic = async (daoId:number, isPublic:boolean) => {
		const contract = await this.getContract();

		const tx = await contract.setDaoPublic(daoId, isPublic);

		await tx.wait();

		return tx.hash;			
	}

	public updateDao = async (daoId:number, name:string, desc:string, website:string, url:string) => {
		const contract = await this.getContract();

		const tx = await contract.updateDao(daoId, name, desc, website, url);

		await tx.wait();

		return tx.hash;		
	}

	public checkInDao = async (daoId:number, user:string) => {
		const contract = await this.getContract();

		return await contract.checkInDao(daoId, user);
	}

	public getDaoIndexsByPageCount = async (pageSize:number, pageCount:number, onlyOwner:boolean) => {
		const contract = await this.getContract();

		const indexList = [];

		const res = await contract.getDaoIndexsByPageCount(pageSize, pageCount, onlyOwner);

		for(const i in res){
			indexList.push(res[i].toNumber());
		}

		return indexList;
	}

	//todo parse dao info
	public getDaoInfoById = async (daoId:number) => {
		const contract = await this.getContract();

		const res = await contract.getDaoInfoById(daoId);

		return res;
	}

	public getDaoMembers = async (daoId:number) => {
		const contract = await this.getContract();

		const res = await contract.getDaoMembers(daoId);

		return res.toNumber();
	}

	public getDaoTotalCount = async (onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getDaoTotalCount(onlyOwner);

		return res.toNumber();
	}
}