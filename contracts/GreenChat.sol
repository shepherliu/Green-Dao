//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract GreenChat {
    //contract owner
    address private _owner;

    //map for web3 name public key
    mapping(address => string) private _publicKeys;

    //map for web3 name private key
    mapping(address => string) private _privateKeys;

    //address list
    address[] _addressLists;

    constructor() {
        _owner = msg.sender;
    }

    //update address web3 name keys
    function updateKeys(string memory publicKey, string memory privateKey) public {
        require(bytes(publicKey).length > 0, "invalid public key!");
        require(bytes(privateKey).length > 0, "invalid private key!");

        if(bytes(_publicKeys[msg.sender]).length == 0){
            _addressLists.push(msg.sender);
        }

        _publicKeys[msg.sender] = publicKey;
        _privateKeys[msg.sender] = privateKey;
    } 

    //get address public key
    function getPublicKey(address to) public view returns (string memory) {
        return _publicKeys[to];
    }

    //get address private key
    function getPrivateKey(address to) public view returns (string memory) {
        return _privateKeys[to];
    }    

    //get address and peer id list for page size and page count
    function getPeerList(uint pageSize, uint pageCount) public view returns (address[] memory, string[] memory, string[] memory) {
        address[] memory addressList;
        string[] memory publicList;
        string[] memory privateList;

        if(pageSize == 0){
            return (addressList, publicList, privateList);
        }

        if(pageSize > 100) {
            pageSize = 100;
        }

        uint start = pageSize*pageCount;
        uint end = start + pageSize;

        if(start > _addressLists.length){
            return (addressList, publicList, privateList);
        }

        if(end > _addressLists.length){
            end = _addressLists.length;
        }

        uint count;
        address[] memory tmp1 = new address[](pageSize);
        string[] memory tmp2 = new string[](pageSize);
        string[] memory tmp3 = new string[](pageSize);

        for(uint i = start; i < end; i++){
            tmp1[count] = _addressLists[i];
            tmp2[count] = _publicKeys[_addressLists[i]];
            tmp3[count] = _privateKeys[_addressLists[i]];
            count += 1;
        }

        if(tmp1.length > 0){
            addressList = new address[](count);
            publicList = new string[](count);
            privateList = new string[](count);

            for(uint i = 0; i < count; i++){
                addressList[i] = tmp1[i];
                publicList[i] = tmp2[i];
                privateList[i] = tmp3[i];
            }
        }

        return (addressList, publicList, privateList);
    }
}