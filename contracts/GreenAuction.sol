//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//auction status: waitting for start; on going; success; failed; canceled; finished(success, failed and canceled etc.);
enum Status {
    UPCOMING, //0
    ONGOING, //1
    CANCELED, //2   
    FAILED, //3     
    SUCCESS, //4
    CLAIMED, //5
    RETURNBACK, //6
    FINISHED //7
}

enum AucType{
    English, //English Auction
    Dutch //Dutch Auction
}

struct AucInfo {
    uint256 nftId; //nft id to sell
    address nftContract; //nft contract to sell
    address nftOwner; //nft owner
    address payContract; //payment token contract
    address bidAddress; //bid address for now
    uint startTime; //auction start time
    uint endTime; //auction end time
    uint cancelTime; //the time that the auction can be canceled by the owner
    uint256 startPrice; //start price
    uint256 reversePrice; //reverse price
    uint256 priceDelta; //price delta
    uint256 bidPrice; //bid price for now
    Status status; //auction status
    AucType aucType; //auction type
} 

contract GreenAuction is ERC721Enumerable, ReentrancyGuard {   

    using Counters for Counters.Counter;

    //auctionId
    Counters.Counter private _aucId;

    //auctionInfo
    mapping(uint256 => AucInfo) private _aucInfos;      

    constructor() ERC721("Green Auction", "GRAUC") {
    } 

    //mint as a nft, and start a new auction
    function mint(
        uint startTime, 
        uint endTime, 
        uint cancelTime,    
        uint256 startPrice, 
        uint256 reversePrice, 
        uint256 priceDelta,   
        AucType aucType,
        uint256 nftId,      
        address nftContract,
        address payContract
    ) public returns (uint256) {

        require(startPrice > 0 && reversePrice > 0, "price invalid");

        //use native token as pay token
        if(payContract == msg.sender || payContract == address(this) || payContract == nftContract){
            payContract = address(0x0);
        }        

        //transfer nft to the contract
        ERC721(nftContract).transferFrom(msg.sender, address(this), nftId);     

        //mint auction as a nft
        _aucId.increment();
        uint256 newId = _aucId.current();
        _mint(msg.sender, newId);

        //init auction info
        _aucInfos[newId] = AucInfo({
            nftId: nftId,
            nftContract: nftContract,
            nftOwner: msg.sender,
            payContract: payContract,
            bidAddress: address(0x0),
            startTime: startTime,
            endTime: endTime,
            cancelTime: cancelTime,
            startPrice: startPrice,
            reversePrice: reversePrice,
            priceDelta: priceDelta,
            bidPrice: 0,
            status: Status.UPCOMING,
            aucType: aucType
        });

        return newId;
    }     

    function cancelAuction(uint256 aucId) public nonReentrant payable returns(bool){
        AucInfo memory auc = _aucInfos[aucId];     

        //check if already success or not
        require(auc.status == Status.UPCOMING || auc.status == Status.ONGOING, "auction finished!");

        //check the auction owner
        require(msg.sender == auc.nftOwner, "only owner allowed!");

        //check if it can be canceled for now
        require(block.timestamp <= auc.cancelTime, "time not allowed!");

        //set auction to canceled;
        _aucInfos[aucId].status = Status.CANCELED;           

        //transfer the nft to the owner
        ERC721(auc.nftContract).transferFrom(address(this), auc.nftOwner, auc.nftId);

        //transfer tokens to the bid address
        if(auc.bidPrice > 0){
            if(auc.payContract == address(0x0)){
                payable(auc.bidAddress).transfer(auc.bidPrice);
            }else{
                ERC20(auc.payContract).transferFrom(address(this), auc.bidAddress, auc.bidPrice);
            }
        }        

        return true;
    }

    //bid a price for the nft token
    function bidForNft(uint256 aucId, uint256 amount) public nonReentrant payable returns(bool){
        AucInfo memory auc = _getAucInfoById(aucId);

        //check if the acution is finished or not
        require(auc.status == Status.ONGOING, "auction not on going!");

        //check paytoken is erc20 or not
        if(auc.payContract == address(0x0)){
            amount = msg.value;
        }

        if(auc.aucType == AucType.English){
            //check the bid price large than the start price or not
            require(amount >= auc.startPrice, "bid price not enough!");

            //if no body bid a price yet
            if(auc.bidPrice > 0){
                //must large than the old bid price + min bid increase
                require(amount >= auc.bidPrice + auc.priceDelta, "bid price not enough!");

                //send back the payment to the old bid address
                if(auc.payContract == address(0x0)){
                    payable(auc.bidAddress).transfer(auc.bidPrice);
                }else{
                    ERC20(auc.payContract).transferFrom(address(this), auc.bidAddress, auc.bidPrice);
                }
            }

            //receive tokens
            if(auc.payContract != address(0x0)){
                ERC20(auc.payContract).transferFrom(msg.sender, address(this), amount);
            }
        }else{
            //check bid price
            require(amount + (block.timestamp - auc.startTime)*auc.priceDelta/86400 >= auc.startPrice, "bid price not enough!");

            //set the auction status, success if large than the reverse price and exchange tokens directly.
            if(amount >= auc.reversePrice){
                //set status to claimed
                _aucInfos[aucId].status = Status.CLAIMED;

                //transfer nft to bid address
                ERC721(auc.nftContract).transferFrom(address(this), msg.sender, auc.nftId);              

                //transfer pay token to nftowner
                if(auc.payContract == address(0x0)){
                    payable(auc.nftOwner).transfer(amount);
                }else{
                    ERC20(auc.payContract).transferFrom(msg.sender, auc.nftOwner, amount);  
                }        
            }else{
                //set status to failed
                _aucInfos[aucId].status = Status.RETURNBACK;

                //if auction failed, send back the nft to the owner
                ERC721(auc.nftContract).transferFrom(address(this), auc.nftOwner, auc.nftId);            

                if(auc.payContract == address(0x0)){
                    //if auction failed, send back payment to msg.sender
                    payable(msg.sender).transfer(amount);
                }
            }
        }

        //set new highest bid price and bid address
        _aucInfos[aucId].bidPrice = amount;
        _aucInfos[aucId].bidAddress = msg.sender;        
        
        return true;
    }

    //claim the auction by the nft owner or the bid address
    function claimAuction(uint256 aucId) public nonReentrant payable returns(bool){
        address nftAddr;
        address tokenAddr;        
        AucInfo memory auc = _getAucInfoById(aucId);

        //only success status can be claimed
        require(auc.status == Status.SUCCESS || auc.status == Status.FAILED, "status not success or failed!");

        //only nft owner and bid address can be claimed
        require(msg.sender == auc.bidAddress || msg.sender == auc.nftOwner, "user not allowed!");

        if(auc.status == Status.SUCCESS){
            //set auction status to success
            _aucInfos[aucId].status = Status.CLAIMED;  
            nftAddr = auc.bidAddress;
            tokenAddr = auc.nftOwner;
        } else{
            _aucInfos[aucId].status = Status.RETURNBACK;
            nftAddr = auc.nftOwner;
            tokenAddr = auc.bidAddress;
        }

        //send nft to the bid address
        ERC721(auc.nftContract).transferFrom(address(this), nftAddr, auc.nftId);              

        if(auc.bidPrice > 0){
            //send the payment to the nft owner
            if(auc.payContract == address(0x0)){
                payable(tokenAddr).transfer(auc.bidPrice);
            }else{
                ERC20(auc.payContract).transferFrom(address(this), tokenAddr, auc.bidPrice);
            }       
        }

        return true;
    }

    //get auction info by id
    function _getAucInfoById(uint256 aucId) internal view returns(AucInfo memory){
        AucInfo memory auc = _aucInfos[aucId];

        //UPCOMING is init status
        if(auc.status == Status.UPCOMING){
            if(block.timestamp < auc.startTime){
                //UPCOMING status
                return auc;
            }else if(block.timestamp <= auc.endTime){
                //on going
                auc.status = Status.ONGOING;
            }else if(auc.bidPrice >= auc.reversePrice){
                //auction success
                auc.status = Status.SUCCESS;
            }else{
                //auction failed
                auc.status = Status.FAILED;
            }       
        }

        return auc;
    }

    //get auction price info
    function getAuctionInfoById(uint256 aucId) public view returns(AucInfo memory){
        AucInfo memory auc = _getAucInfoById(aucId);

        if(auc.status == Status.UPCOMING || auc.status == Status.ONGOING){
            auc.reversePrice = 0;
        }

        return auc;
    }

    //get auction ids by Paginations
    function getAuctionIndexsByPage(uint pageSize, uint pageCount, Status aucStatus, bool owner) public view returns(uint256[] memory){
        uint256[] memory tmpList = new uint256[](pageSize);
        uint256[] memory indexList;

        uint start = pageSize * pageCount;
        uint end = start + pageSize;
        uint count;
        uint index;
        uint aucId;
        uint256 balance;   

        if(owner){
            balance = balanceOf(msg.sender);
        }else{
            balance = totalSupply();
        }     

        for(uint i = 0; i < balance; i++){
            //get own auction or not
            if(owner){
                aucId = tokenOfOwnerByIndex(msg.sender, i);
            }else{
                aucId = tokenByIndex(i);
            }     

            AucInfo memory auc = _getAucInfoById(aucId);
            if(aucStatus == Status.FINISHED && (auc.status == Status.UPCOMING || auc.status == Status.ONGOING)){
                continue;
            }else if(aucStatus != Status.FINISHED && aucStatus != auc.status){
                continue;
            }else{
                count++;
            }          

            if(count < start || count > end){
                continue;
            } else {
                tmpList[index++] = aucId;
            }
        }

        if(index > 0){
            indexList = new uint256[](index);
            for(uint i = 0; i < index; i++){
                indexList[i] = tmpList[i];
            }
        }

        return indexList;
    }
}

