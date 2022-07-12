<template>
  <div class="file-arae">
    <el-container>
      <el-header style="background-color: #ffffff;">
        <el-tabs v-model="activeName" class="file-tabs" @tab-click="handleClick">
          <el-tab-pane label="All" name="all"></el-tab-pane>
          <el-tab-pane label="Mine" name="mine"></el-tab-pane>
        </el-tabs>     
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="showAddNewAuctionVisiable = true;">NEW+
        </el-button>    
        <el-drawer v-model="showAddNewAuctionVisiable" direction="rtl" destroy-on-close @opened="onAddNewAuctionOpen">
          <template #header>
            <h4>Create A New Green Auction.</h4>   
          </template>
          <template #default>  
            <table style="margin-left: 10px;">
              <tr v-if="auctionId > 0">
                <td style="width:135px">Id
                  <el-popover
                    placement="top-start"
                    title="Auction Id"
                    :width="200"
                    trigger="hover"
                    content="The id of the green auction."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionId" disabled>
                    <template #append>
                      <el-icon @click="onClickToCopy(auctionId)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td style="width:135px">Dao Id
                  <el-popover
                    placement="top-start"
                    title="Dao Id"
                    :width="200"
                    trigger="hover"
                    content="The dao id of the green dao. The auction must be published through the dao."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="daoId" @change="updateDaoName(daoId)" :disabled="auctionId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(daoId)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>
              </tr>    
              <tr>
                <td style="width:135px">Dao Name
                  <el-popover
                    placement="top-start"
                    title="Dao Name"
                    :width="200"
                    trigger="hover"
                    content="The name of the green dao."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="daoName" disabled>
                    <template #append>
                      <el-icon @click="onClickToCopy(daoName)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>
              <tr>
                <td style="width:135px">Start Time
                  <el-popover
                    placement="top-start"
                    title="Auction Start Time"
                    :width="200"
                    trigger="hover"
                    content="The start time of the green auction."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-date-picker
                    v-model="auctionStartTime"
                    style="width: 100%;"
                    type="datetime"
                    placeholder="Pick a Date"
                    :format="timeFormat"
                  >
                  </el-date-picker>
                </td>                   
              </tr>  
              <tr>
                <td style="width:135px">End Time
                  <el-popover
                    placement="top-start"
                    title="Auction End Time"
                    :width="200"
                    trigger="hover"
                    content="The end time of the green auction."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-date-picker
                    v-model="auctionEndTime"
                    style="width: 100%;"
                    type="datetime"
                    placeholder="Pick a Date"
                    :format="timeFormat"
                  >
                  </el-date-picker>
                </td>                   
              </tr>  
              <tr>
                <td style="width:135px">Start Price
                  <el-popover
                    placement="top-start"
                    title="Auction Start Price"
                    :width="200"
                    trigger="hover"
                    content="The start price of the auction."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionStartPrice">
                     <template #append>
                      <el-icon @click="onClickToCopy(auctionStartPrice)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>     
              <tr>
                <td style="width:135px">Reverse Price
                  <el-popover
                    placement="top-start"
                    title="Auction Reverse Price"
                    :width="200"
                    trigger="hover"
                    content="The revere price of the auction. The auction will be failed if the last bid price less than the reverse price."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionReversePrice">
                     <template #append>
                      <el-icon @click="onClickToCopy(auctionReversePrice)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>    
              <tr>
                <td style="width:135px">Delta Price
                  <el-popover
                    placement="top-start"
                    title="Auction Delta Price"
                    :width="200"
                    trigger="hover"
                    content="For english auction that means the minimum bid increase. For dutch auction that means the price decrease rate per day."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionDeltaPrice">
                     <template #append>
                      <el-icon @click="onClickToCopy(auctionDeltaPrice)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>            
              <tr>
                <td style="width:135px">Type
                  <el-popover
                    placement="top-start"
                    title="Auction Type"
                    :width="200"
                    trigger="hover"
                    content="You can choose English Auction or Dutch Auction."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px;margin-left:0px;">
                  <el-select 
                    v-model="auctionType"
                    style="width:100%;margin-left:0px;"
                    placeholder="Select Auction Type"
                    :teleported="false"
                    filterable
                  >
                    <el-option key="english" label="English Auction" :value="0"/>
                    <el-option key="dutch" label="Dutch Auction" :value="1"/>
                  </el-select> 
                </td>                   
              </tr>    
              <tr>
                <td style="width:135px">Nft Id
                  <el-popover
                    placement="top-start"
                    title="Auction Nft Id"
                    :width="200"
                    trigger="hover"
                    content="The nft id of the auction to sell."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionNftId" :disabled="auctionId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(auctionNftId)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>  
              <tr>
                <td style="width:135px">Nft Contract
                  <el-popover
                    placement="top-start"
                    title="Auction Nft Contract"
                    :width="200"
                    trigger="hover"
                    content="The nft contract of the auction to sell."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionNftContract" :disabled="auctionId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(auctionNftContract)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>                                             
              <tr>
                <td style="width:135px">Pay Token
                  <el-popover
                    placement="top-start"
                    title="Auction Payment Token"
                    :width="200"
                    trigger="hover"
                    content="The token contract address for the green auction. You can choose the blockchain native token or the erc20 tokens to receive the payment."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="auctionPayToken" :disabled="auctionId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(auctionPayToken)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>                                        
            </table>
          </template>
          <template #footer>
            <div 
              style="flex: auto"
              v-loading="loadDrawerStatus" 
              element-loading-text="Submitting..."
              :element-loading-spinner="svg"
              element-loading-svg-view-box="-10, -10, 50, 50"
              element-loading-background="#ffffff"
            >
              <el-button @click="cancelAuctionUpdate">cancel</el-button>
              <el-button type="primary" v-if="auctionNftApproved === false" @click="approveNftToken">approve</el-button>
              <el-button type="primary" v-if="auctionNftApproved === true" @click="confirmAuctionUpdate">confirm</el-button>
            </div>
          </template>
        </el-drawer>        
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AuctionsPage',
  props: {
  }
}
</script>

<script setup lang="ts">
  
import { ref } from "vue"
import { connected, connectState } from "../libs/connect"
import * as constant from "../constant"
import * as element from "../libs/element"
import * as tools from "../libs/tools"

import { ERC721 } from "../libs/erc721";
import { GreenDao } from "../libs/greendao"
import { GreenAuction } from "../libs/greenauction"

const greendao = new GreenDao();
const greenauction = new GreenAuction();

const activeName = connectState.activeName;
const loadStatus = ref(false);
const loadDrawerStatus = ref(false);

const showAddNewAuctionVisiable = ref(false);

const daoId = ref(0);
const daoName = ref('');
const auctionId = ref(0);
const auctionStartTime = ref('');
const auctionEndTime = ref('');
const auctionStartPrice = ref(0);
const auctionReversePrice = ref(0);
const auctionDeltaPrice = ref(0);
const auctionNftId = ref(0);
const auctionNftContract = ref('');
const auctionNftApproved = ref(false);
const auctionPayToken = ref('');
const auctionType = ref(0);

const zeroAddress = '0x0000000000000000000000000000000000000000';
const timeFormat = "YYYY/MM/DD hh:mm:ss";

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

//transaction explore url
const transactionExplorerUrl = (transaction:string) => {
  for(const i in constant.chainList){
    if(connectState.chainId === constant.chainList[i].chainId){
      const blockExplorerUrls = constant.chainList[i].blockExplorerUrls;
      return blockExplorerUrls + '/tx/' + transaction;
    }
  }
  return transaction;
}

//on click to copy address
const onClickToCopy = async (content:string) => {
  tools.clickToCopy(content);
  
  element.elMessage('success', 'Copy ' + content + ' to clipboard success.');     
};

//get dao id
const getDaoId = () => {
  const daoId = tools.getUrlParamter('daoId');
  try{
    return Number(daoId);
  }catch(e){
    return 0;
  }
}

//update dao name by dao id
const updateDaoName = async (daoId:Number) => {
  const daoInfo = await greendao.getDaoInfoById(daoId);
  daoName.value = daoInfo.daoName;
}

//click to open the drawer to create a new auction
const onAddNewAuctionOpen = async () => {
  daoId.value = getDaoId();
  auctionId.value = 0;
  auctionStartPrice.value = 0;
  auctionReversePrice.value = 0;
  auctionDeltaPrice.value = 0;
  auctionType.value = 0;
  auctionNftId.value = 0;
  auctionNftContract.value = zeroAddress;
  auctionNftApproved.value = false;
  auctionPayToken.value = zeroAddress;

  const now = new Date();
  auctionStartTime.value = now.toLocaleString();

  now.setTime(now.getTime() + 30*24*3600*1000);
  auctionEndTime.value = now.toLocaleString();

  await updateDaoName(daoId.value);
}

//click to cancel auction create
const cancelAuctionUpdate = async () => {
  showAddNewAuctionVisiable.value = false;
}

//click to approve the nft token to the auction contract
const approveNftToken = async () => {
  if(auctionNftApproved.value === true){
    return true;
  }

  try{
    loadDrawerStatus.value = true;

    const erc721 = new ERC721(auctionNftContract.value);

    const contractAddress = (constant.greenAuctionContractAddress as any)[connectState.chainId].toLowerCase();

    const approvedAddress = (await erc721.getApproved(auctionNftId.value)).toLowerCase();

    if(approvedAddress === contractAddress){
      auctionNftApproved.value = true;
    }else{
      const tx = await erc721.approve(contractAddress, auctionNftId.value);
      auctionNftApproved.value = true;
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
      const msg = `<div><span>Approve nft token success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);    
    }

  }catch(e){
    element.alertMessage(e);
  }finally{
    loadDrawerStatus.value = false;
  }
}

//click to confirm to create a new auction
const confirmAuctionUpdate = async () => {
  try{
    loadDrawerStatus.value = true;

    const startTime = new Date(auctionStartTime.value).getTime()/1000;
    const endTime = new Date(auctionEndTime.value).getTime()/1000;

    const tx = await greenauction.mint(startTime, endTime, auctionStartPrice.value, auctionReversePrice.value, auctionDeltaPrice.value, auctionType.value, daoId.value, auctionNftId.value, auctionNftContract.value, auctionPayToken.value);
    connectState.transactions.value.unshift(tx);
    connectState.transactionCount.value++;
    const msg = `<div><span>Create auction success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
    element.elMessage('success', msg, true);    

    showAddNewAuctionVisiable.value = false;

    handleClick();
  }catch(e){
    element.alertMessage(e);
  }finally{
    loadDrawerStatus.value = false;
  }
}

//handle page refresh
const handleClick = async () => {
  //wait for the active name change
  await tools.sleep(100);
    
  connectState.activeName.value = activeName.value;
  tools.setUrlParamter('activeName', activeName.value);
  try{
    loadStatus.value = true;
    if (!(await connected())){
      return;
    }
  }finally{
    loadStatus.value = false;
  }
}

//clean search content and bind search callback function
connectState.search = '';
connectState.searchCallback = handleClick;
//try get activeName from the url paramter
try{
  activeName.value = tools.getUrlParamter('activeName');
  if(activeName.value != 'all' && 
    activeName.value != 'mine'){
    activeName.value = 'all';
  }
}catch(e){
  activeName.value = 'all';
}
//update page size
handleClick();
</script>