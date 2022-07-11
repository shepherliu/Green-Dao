<template>
  <div class="file-arae">
    <el-container>
      <el-header style="background-color: #ffffff;">
        <el-tabs v-model="activeName" class="file-tabs" @tab-click="handleClick">
          <el-tab-pane label="All" name="all"></el-tab-pane>
          <el-tab-pane label="Mine" name="mine"></el-tab-pane>
        </el-tabs>     
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="showAddNewGrantVisiable = true;">NEW+
        </el-button>    
        <el-drawer v-model="showAddNewGrantVisiable" v-loading="loadDrawerStatus" direction="rtl" destroy-on-close @opened="onAddNewGrantOpen">
          <template #header>
            <h4>Create A New Green Grant.</h4>   
          </template>
          <template #default>  
            <table style="margin-left: 10px;">
              <tr v-if="grantId > 0">
                <td style="width:120px">Id
                  <el-popover
                    placement="top-start"
                    title="Grant Id"
                    :width="200"
                    trigger="hover"
                    content="The id of the green grant."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="grantId" disabled>
                    <template #append>
                      <el-icon @click="onClickToCopy(grantId)"><document-copy /></el-icon>
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
                    content="The dao id of the green dao. The grant must be published through the dao."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="daoId" @change="updateDaoName(daoId)">
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
                    title="Grant Title"
                    :width="200"
                    trigger="hover"
                    content="The title of the green grant."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="grantTitle">
                    <template #append>
                      <el-icon @click="onClickToCopy(grantTitle)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>           
              <tr>
                <td style="width:120px">Description
                  <el-popover
                    placement="top-start"
                    title="Grant Description"
                    :width="200"
                    trigger="hover"
                    content="The description of the green grant."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="grantDescription" type="textarea" rows = "5">
                  </el-input>
                </td>                   
              </tr>  
              <tr>
                <td style="width:120px">End Time
                  <el-popover
                    placement="top-start"
                    title="Grant End Time"
                    :width="200"
                    trigger="hover"
                    content="The end time of the green grant."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-date-picker
                    v-model="grantEndTime"
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
                    title="Grant Payment Token"
                    :width="200"
                    trigger="hover"
                    content="The token contract address to support for the green grant. You can choose the blockchain native token or the erc20 tokens."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="grantToken">
                    <template #append>
                      <el-icon @click="onClickToCopy(grantToken)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>  
              <tr>
                <td style="width:120px">Github
                  <el-popover
                    placement="top-start"
                    title="Grant Github"
                    :width="200"
                    trigger="hover"
                    content="The github url link of the green grant."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="grantGitUrl">
                     <template #append>
                      <el-icon @click="onClickToCopy(grantGitUrl)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>                                            
              <tr>
                <td style="width:120px">Website
                  <el-popover
                    placement="top-start"
                    title="Grant Website"
                    :width="200"
                    trigger="hover"
                    content="The website link of the green grant. You can input the url link directly or upload the website folder through the upload button."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="grantWebsite">
                    <template #append>
                      <el-icon @click="onClickToCopy(grantWebsite)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>      
              <tr v-loading="loadWebsiteStatus">
                <td style="width:120px"></td>
                <td style="width:300px">
                  <el-upload 
                    style="width: 100px;height: 0px;float: right;margin-right: 100px;"
                    :drag="false"
                    :multiple="true"
                    class="upload-website"
                    ref="uploadWebsite"
                    action=""
                    @change="onChangeSelectWebsiteFolder"
                    @click="onSelectWebsiteFolder"
                    :limit="0"
                    :show-file-list="false"
                    :auto-upload="false"
                    element-loading-text="Uploading..."
                    :element-loading-spinner="svg"
                    element-loading-svg-view-box="-10, -10, 50, 50"
                    element-loading-background="#ffffff"
                  >
                    <template #trigger>
                      <el-button type="primary" style="float: right;margin-right: 10px;width: 100%;">Select Folder</el-button>
                    </template>
                  </el-upload>
                  <el-button type="success" style="float: right;" @click="onUploadWebsiteFolder">Upload</el-button>
                </td>
              </tr>                                        
            </table>
          </template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="cancelGrantUpdate">cancel</el-button>
              <el-button type="primary" @click="confirmGrantUpdate">confirm</el-button>
            </div>
          </template>
        </el-drawer>  
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GrantsPage',
  props: {
  }
}
</script>

<script setup lang="ts">
  
import { getCurrentInstance, ComponentInternalInstance, ref } from 'vue'

import { toRaw } from '@vue/reactivity'
import * as path from "path"
import type { UploadInstance, UploadFile, UploadFiles } from 'element-plus'

import { connected, connectState } from "../libs/connect"
import * as constant from "../constant"
import * as element from "../libs/element"
import * as tools from "../libs/tools"
import * as storage from '../libs/storage'
import { GreenDao } from "../libs/greendao"
import { GreenGrant } from "../libs/greengrant"

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const uploadWebsite = ref<UploadInstance>();

const greendao = new GreenDao();
const greengrant = new GreenGrant();

const zeroAddress = '0x0000000000000000000000000000000000000000';
const timeFormat = "YYYY/MM/DD hh:mm:ss";

const activeName = connectState.activeName;
const loadStatus = ref(false);
const loadDrawerStatus = ref(false);
const loadWebsiteStatus = ref(false);

const daoId = ref(0);
const daoName = ref('');
const grantId = ref(0);
const grantTitle = ref('');
const grantDescription = ref('');
const grantGitUrl = ref('');
const grantWebsite = ref('');
const grantToken = ref('');
const grantEndTime = ref('');

const showAddNewGrantVisiable = ref(false);
const websiteFileList = ref(new Array());

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

//on website folder change
const onChangeSelectWebsiteFolder = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  websiteFileList.value = toRaw(uploadFiles);
  
  grantWebsite.value = (websiteFileList.value[0].raw as any).webkitRelativePath.split(path.sep)[0];
  if(grantWebsite.value === ''){
    grantWebsite.value = (websiteFileList.value[0].raw as any).name;
  }
}

//on click to select website folder
const onSelectWebsiteFolder = async () => {
  uploadWebsite.value!.clearFiles();
}

//on click to upload website folder
const onUploadWebsiteFolder = async () => {
    try{

      loadWebsiteStatus.value = true;

      if(toRaw(websiteFileList.value).length === 0){
        element.elMessage('warning', 'You have not select any folder to upload!');
        return;
      }

      let directory = (websiteFileList.value[0].raw as any).webkitRelativePath.split(path.sep)[0];
      if(directory === ''){
        directory = (websiteFileList.value[0].raw as any).name;
      }

      let findIndex = false;

      for(const i in websiteFileList.value){
        const file = websiteFileList.value[i];
        if((file.raw as any).name === 'index.html'){
          findIndex = true;
          break;
        }
      }

      if(findIndex === false){
        element.elMessage('warning', 'Not a valid website folder, index.html not found in the root path!');
        return;
      }

      grantWebsite.value = await storage.uploadFolder(directory, toRaw(websiteFileList.value));
    }catch(e){
      element.alertMessage(e);
    }finally{
      loadWebsiteStatus.value = false;
    }
}      

const onAddNewGrantOpen = async () => {
  daoId.value = getDaoId();
  grantId.value = 0;
  grantTitle.value = '';
  grantDescription.value = '';
  grantGitUrl.value = '';
  grantWebsite.value = '';
  grantToken.value = zeroAddress;

  const now = new Date();
  now.setTime(now.getTime() + 30*24*3600*1000);
  grantEndTime.value = now.toLocaleString();

  const currentClass = (proxy as any).$el.parentNode.querySelector(".upload-website");

  (currentClass.querySelector(".el-upload__input") as any).webkitdirectory = true;  

  await updateDaoName(daoId.value);
}

const cancelGrantUpdate = async () => {
  showAddNewGrantVisiable.value = false;
}

const confirmGrantUpdate = async () => {

  try{
    loadDrawerStatus.value = true;

    const endTime = new Date(grantEndTime.value).getTime()/1000;

    if(grantId.value > 0){
      const tx = await greengrant.updateDao(grantId.value, grantTitle.value, grantDescription.value, grantGitUrl.value, grantWebsite.value, endTime);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
            const msg = `<div><span>Update grant success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);        
    }else{
      const tx = await greengrant.mint(grantTitle.value, grantDescription.value, grantGitUrl.value, grantWebsite.value, grantToken.value, daoId.value, endTime);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
      const msg = `<div><span>Create grant success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);      
    }    

    showAddNewGrantVisiable.value = false;

    handleClick();     

  }catch(e){
    element.alertMessage(e);
  }finally{
    loadDrawerStatus.value = false;
  }  
}

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
</script>