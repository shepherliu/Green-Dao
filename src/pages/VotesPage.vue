<template>
  <div class="file-arae">
    <el-container>
      <el-header style="background-color: #ffffff;">
        <el-tabs v-model="activeName" class="file-tabs" @tab-click="handleClick">
          <el-tab-pane label="All" name="all"></el-tab-pane>
          <el-tab-pane label="Mine" name="mine"></el-tab-pane>
        </el-tabs>     
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="showAddNewVoteVisiable = true;">NEW+
        </el-button>    
        <el-drawer v-model="showAddNewVoteVisiable" direction="rtl" destroy-on-close @opened="onAddNewVoteOpen">
          <template #header>
            <h4>Create A New Green Vote.</h4>   
          </template>
          <template #default>  
            <table style="margin-left: 10px;">
              <tr v-if="voteId > 0">
                <td style="width:120px">Id
                  <el-popover
                    placement="top-start"
                    title="Vote Id"
                    :width="200"
                    trigger="hover"
                    content="The id of the green vote."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="voteId" disabled>
                    <template #append>
                      <el-icon @click="onClickToCopy(voteId)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td style="width:120px">Dao Id
                  <el-popover
                    placement="top-start"
                    title="Dao Id"
                    :width="200"
                    trigger="hover"
                    content="The dao id of the green dao. The vote must be published through the dao."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="daoId" @change="updateDaoName(daoId)" :disabled="voteId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(daoId)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>
              </tr>    
              <tr>
                <td style="width:120px">Dao Name
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
                <td style="width:120px">Title
                  <el-popover
                    placement="top-start"
                    title="Vote Title"
                    :width="200"
                    trigger="hover"
                    content="The title of the green vote."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="voteTitle">
                    <template #append>
                      <el-icon @click="onClickToCopy(voteTitle)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>           
              <tr>
                <td style="width:120px">Description
                  <el-popover
                    placement="top-start"
                    title="Vote Description"
                    :width="200"
                    trigger="hover"
                    content="The description of the green vote."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="voteDescription" type="textarea" rows = "5">
                  </el-input>
                </td>                   
              </tr>  
              <tr>
                <td style="width:120px">End Time
                  <el-popover
                    placement="top-start"
                    title="Vote End Time"
                    :width="200"
                    trigger="hover"
                    content="The end time of the green vote."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-date-picker
                    v-model="voteEndTime"
                    style="width: 100%;"
                    type="datetime"
                    placeholder="Pick a Date"
                    :format="timeFormat"
                  >
                  </el-date-picker>
                </td>                   
              </tr>  
              <tr>
                <td style="width:120px">Pay Token
                  <el-popover
                    placement="top-start"
                    title="Vote Payment Token"
                    :width="200"
                    trigger="hover"
                    content="The token contract for the green vote. You can choose the blockchain native token or the erc20 tokens based on the balance of the dao treassure."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="voteToken" :disabled="voteId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(voteToken)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>  
              <tr>
                <td style="width:120px">Pay Value
                  <el-popover
                    placement="top-start"
                    title="Vote Pay Value"
                    :width="200"
                    trigger="hover"
                    content="The amount of the token value that the vote request for."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="voteValue" :disabled="voteId > 0">
                     <template #append>
                      <el-icon @click="onClickToCopy(voteValue)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>                                            
              <tr>
                <td style="width:120px">Pay To
                  <el-popover
                    placement="top-start"
                    title="Vote Pay To"
                    :width="200"
                    trigger="hover"
                    content="The dest address that the vote payment send to."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="voteTo" :disabled="voteId > 0">
                    <template #append>
                      <el-icon @click="onClickToCopy(voteTo)"><document-copy /></el-icon>
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
              <el-button @click="cancelVoteUpdate">cancel</el-button>
              <el-button type="primary" @click="confirmVoteUpdate">confirm</el-button>
            </div>
          </template>
        </el-drawer>    
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VotesPage',
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

import { GreenDao } from "../libs/greendao"
import { GreenVote } from "../libs/greenvote"

const greendao = new GreenDao();
const greenvote = new GreenVote();

const activeName = connectState.activeName;
const loadStatus = ref(false);
const loadDrawerStatus = ref(false);

const showAddNewVoteVisiable = ref(false);

const daoId = ref(0);
const daoName = ref('');
const voteId = ref(0);
const voteTitle = ref('');
const voteDescription = ref('');
const voteToken = ref('');
const voteValue = ref(0);
const voteTo = ref('');
const voteEndTime = ref('');

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

//click to open the drawer to create a new vote
const onAddNewVoteOpen = async () => {
  daoId.value = getDaoId();
  voteId.value = 0;
  voteTitle.value = '';
  voteDescription.value = '';
  voteToken.value = zeroAddress;
  voteValue.value = 0;
  voteTo.value = '';

  const now = new Date();
  now.setTime(now.getTime() + 30*24*3600*1000);

  voteEndTime.value = now.toLocaleString();

  await updateDaoName(daoId.value);
}

//click to cancle vote update or create
const cancelVoteUpdate = async () => {
  showAddNewVoteVisiable.value = false;
}

//click to confirm to update or create the vote
const confirmVoteUpdate = async () => {
  try{
    loadDrawerStatus.value = true;

    const endTime = new Date(voteEndTime.value).getTime()/1000;

    if(voteId.value > 0){
      const tx = await greenvote.updateVote(voteId.value, voteTitle.value, voteDescription.value, endTime);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
            const msg = `<div><span>Update vote success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);   
    }else{
      const tx = await greenvote.mint(voteTitle.value, voteDescription.value, daoId.value, voteValue.value, voteToken.value, voteTo.value, endTime);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
      const msg = `<div><span>Create vote success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);    
    }

    showAddNewVoteVisiable.value = false;

    handleClick();
  }catch(e){
    element.alertMessage(e);
  }finally{
    loadDrawerStatus.value = true;
  }
}

//handle page refresh
const handleClick = async () => {
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