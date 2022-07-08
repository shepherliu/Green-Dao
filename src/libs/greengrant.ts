// example imports 
import { providers, utils, Contract } from "ethers"

import { greenGrantContractAddress } from "../constant"

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
	"function updateContracts(address dao, address treassure) public returns (bool)",
	"function mint(string memory name, string memory desc, string memory git, string memory website, address token, uint256 daoId, uint endTime) public returns (uint256)",
	"function burn(uint256 grantId) public payable returns (bool)",
	"function updateGrant(uint256 grantId, string memory name, string memory desc, string memory git, string memory website, uint endTime) public returns (bool)",
	"function supportGrant(uint256 grantId, uint256 amount)public payable returns (bool)",
	"function claimGrant(uint256 grantId) public payable returns (bool)",
	"function getGrantTreassure(uint256 grantId, bool onlyOwner) public view returns (uint256)",
	"function getGrantTotalCount(bool onlyOwner) public view returns(uint)",
	"function getGrantInfoById(uint256 grantId) public view returns(GrantInfo memory)",
	"function getGrantIndexsByPageCount(uint pageSize, uint pageCount, uint256 daoId, bool onlyOwner) public view returns (uint256 []memory)",
];

const zeroAddress = '0x0000000000000000000000000000000000000000';

export class GreenGrant {
	private contractAddress: string;

	constructor(contractAddress:string = (greenGrantContractAddress as any)[connectState.chainId]){
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

	public updateContracts = async (dao:str, treassure:str) => {
		const contract = await this.getContract();

		const tx = async contract.updateContracts(dao, treassure);

		await tx.wait();

		return tx.hash;			
	}

	public mint = async (name:str, desc:str, git:str, website:str, token:str, daoId:number, endTime:number) => {
		const contract = await this.getContract();

		const tx = await contract.mint(name, desc, git, website, tokenId, daoId, endTime);

		await tx.wait();

		return tx.hash;		
	}

	public burn = async (grantId:number) => {
		const contract = await this.getContract();

		const tx = await contract.burn(grantId);

		await tx.wait();

		return tx.hash;			
	}

	public updateGrant = async (grantId:number, name:str, desc:str, git:str, website:str, endTime:number) => {
		const contract = await this.getContract();

		const tx = await contract.updateGrant(grantId, name, desc, git, website, endTime);

		await tx.wait();

		return tx.hash;			
	}

	public supportGrant = async (grantId:number, payContract:str, amount:number) => {
		const contract = await this.getContract();

		let value = 0;

		if(payContract === zeroAddress){
			value = utils.parseEther(String(amount));
		}else{
			const erc20 = new ERC20(payContract);
			value = utils.parseUnits(String(amount), await erc20.decimals());	
		}	

		const tx = await contract.supportGrant(grantId, value);

		await tx.wait();

		return tx.hash;			
	}

	public claimGrant = async (grantId:number) => {
		const contract = await this.getContract();

		const tx = await contract.claimGrant(grantId);

		await tx.wait();

		return tx.hash;
	}

	public getGrantTreassure = async (grantId:number, payContract:str, onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getGrantTreassure(grantId, onlyOwner);

		if(payContract === zeroAddress){
			return Number(utils.formatEther(res));
		}else{
			const erc20 = new ERC20(payContract);

			return Number(utils.formatUnits(res, await erc20.decimals()));
		}
	}

	public getGrantTotalCount = async (onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getGrantTotalCount(onlyOwner);

		return res.toNumber();
	}

	//todo parse grant info
	public getGrantInfoById = async (grantId:number) => {
		const contract = await this.getContract();

		const res = await contract.getGrantInfoById(grantId);

		return res.toNumber();
	}

	public getGrantIndexsByPageCount = async (pageSize:number, pageCount:number, daoId:number, onlyOwner:boolean) => {
		const contract = await this.getContract();

		const indexList = [];

		const res = await contract.getGrantIndexsByPageCount(pageSize, pageCount, daoId, onlyOwner);

		for(const i in  res){
			indexList.push(res[i].toNumber());
		}

		return indexList;
	}
}