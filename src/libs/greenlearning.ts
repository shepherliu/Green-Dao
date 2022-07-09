// example imports 
import { providers, utils, Contract } from "ethers"

import { greenLearningContractAddress } from "../constant"

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
	"function updateContracts(address dao) public returns (bool)",
	"function mint(string memory name, string memory desc, string memory url, uint256 daoId, LearningType learningType) public returns (uint256)",
	"function burn(uint256 learningId) public returns (bool)",
	"function likeTheLearning(uint256 learningId) public returns (bool)",
	"function hateTheLearning(uint256 learningId) public returns (bool)",
	"function getLearningTotalCount(bool onlyOwner) public view returns(uint)",
	"function getLearningInfoById(uint256 learningId) public view returns (LearningInfo memory)",
	"function getLearningIndexsByPageCount(uint pageSize, uint pageCount, uint256 daoId, bool onlyOwner) public view returns(uint256[] memory)",
];


export class GreenLearning {
	private contractAddress: string;

	constructor(contractAddress:string = (greenLearningContractAddress as any)[connectState.chainId]){
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

	public updateContracts = async (dao:string) => {
		const contract = await this.getContract();

		const tx = await contract.updateContracts(dao);

		await tx.wait();

		return tx.hash;		
	}

	public mint = async (name:string, desc:string, url:string, daoId:number, learningType:number) => {
		const contract = await this.getContract();

		const tx = await contract.mint(name, desc, url, daoId, learningType);

		await tx.wait();

		return tx.hash;			
	}

	public burn = async (learningId:number) => {
		const contract = await this.getContract();

		const tx = await contract.burn(learningId);

		await tx.wait();

		return tx.hash;
	}

	public likeTheLearning = async (learningId:number) => {
		const contract = await this.getContract();

		const tx = await contract.likeTheLearning(learningId);

		await tx.wait();

		return tx.hash;		
	}

	public hateTheLearning = async (learningId:number) => {
		const contract = await this.getContract();

		const tx = await contract.hateTheLearning(learningId);

		await tx.wait();

		return tx.hash;		
	}

	public getLearningTotalCount = async (onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getLearningTotalCount(onlyOwner);

		return res.toNumber();
	}

	//todo parse learning info
	public getLearningInfoById = async (learningId:number) => {
		const contract = await this.getContract();

		const res = await contract.getLearningInfoById(learningId);

		return res;
	}

	public getLearningIndexsByPageCount = async (pageSize:number, pageCount:number, daoId:number, onlyOwner:boolean) => {
		const contract = await this.getContract();

		const indexList = [];

		const res = await contract.getLearningIndexsByPageCount(pageSize, pageCount, daoId, onlyOwner);

		for(const i in res){
			indexList.push(res[i].toNumber());
		}

		return indexList;
	}
}