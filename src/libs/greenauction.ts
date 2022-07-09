// example imports 
import { providers, utils, Contract } from "ethers"

import { greenAuctionContractAddress } from "../constant"

import { networkConnect, connectState } from "./connect"

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
	"function mint(uint startTime, uint endTime, uint256 startPrice, uint256 reversePrice, uint256 priceDelta, AucType aucType,uint256 daoId,uint256 nftId, address nftContract, address payContract) public returns (uint256)",
	"function cancelAuction(uint256 aucId) public payable returns(bool)",
	"function bidForNft(uint256 aucId, uint256 amount) public payable returns(bool)",
	"function claimAuction(uint256 aucId) public payable returns(bool)",
	"function getAuctionInfoById(uint256 aucId) public view returns(AucInfo memory)",
	"function getAuctionTotalCount(bool onlyOwner) public view returns(uint)",
	"function getAuctionIndexsByPage(uint pageSize, uint pageCount, Status aucStatus, bool onlyOwner) public view returns(uint256[] memory)",
];

const zeroAddress = '0x0000000000000000000000000000000000000000';

export class GreenAuction {
	private contractAddress: string;

	constructor(contractAddress:string = (greenAuctionContractAddress as any)[connectState.chainId]){
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

	public updateContracts = async (dao:string, treassure:string) => {
		const contract = await this.getContract();

		const tx = await contract.updateContracts(dao, treassure);

		await tx.wait();

		return tx.hash;			
	}

	public mint = async (start:number, end:number, startPrice:number, reversePrice:number, priceDelta:number, aucType:number, daoId:number, nftId:number, nftContract:string, payContract:string) => {
		const contract = await this.getContract();

		let sPrice, rPrice, dPrice;

		if(payContract === zeroAddress){
			sPrice = utils.parseEther(String(startPrice));
			rPrice = utils.parseEther(String(reversePrice));
			dPrice = utils.parseEther(String(priceDelta));
		}else{
			const erc20 = new ERC20(payContract);
			const decimals = await erc20.decimals();

			sPrice = utils.parseUnits(String(startPrice), decimals);
			rPrice = utils.parseUnits(String(reversePrice), decimals);
			dPrice = utils.parseUnits(String(priceDelta), decimals);			
		}

		const tx = await contract.mint(start, end, sPrice, rPrice, dPrice, aucType, daoId, nftId, nftContract, payContract);

		await tx.wait();

		return tx.hash;		
	}

	public cancelAuction = async (aucId:number) => {
		const contract = await this.getContract();

		const tx = await contract.cancelAuction(aucId);

		await tx.wait();

		return tx.hash;				
	}

	//todo get payContract
	public bidForNft = async (aucId:number, amount:number, payContract:string = zeroAddress) => {
		const contract = await this.getContract();

		let value;

		if(payContract === zeroAddress){
			value = utils.parseEther(String(amount));
		}else{
			const erc20 = new ERC20(payContract);
			value = utils.parseUnits(String(amount), await erc20.decimals());	
		}	

		const tx = await contract.bidForNft(aucId, value);

		await tx.wait();
		return tx.hash;			
	}

	public claimAuction = async (aucId:number) => {
		const contract = await this.getContract();

		const tx = await contract.claimAuction(aucId);

		await tx.wait();

		return tx.hash;		
	}

	//todo parse auction info
	public getAuctionInfoById = async (aucId:number) => {
		const contract = await this.getContract();

		const res = await contract.getAuctionInfoById(aucId);

		return res;
	}

	public getAuctionTotalCount = async (onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getAuctionTotalCount(onlyOwner);

		return res.toNumber();
	}

	public getAuctionIndexsByPage = async (pageSize:number, pageCount:number, aucStatus:number, onlyOwner:boolean) => {
		const contract = await this.getContract();

		const res = await contract.getAuctionIndexsByPage(pageSize, pageCount, aucStatus, onlyOwner);

		const indexList = [];

		for(const i in res){
			indexList.push(res[i].toNumber());
		}

		return indexList;
	}
}