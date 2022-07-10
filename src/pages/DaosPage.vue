<template>
  <div class="file-arae">
    <el-container>
      <el-header style="background-color: #ffffff;">
        <el-tabs v-model="activeName" class="file-tabs" @tab-click="handleClick">
          <el-tab-pane label="All" name="all"></el-tab-pane>
          <el-tab-pane label="Mine" name="mine"></el-tab-pane>
        </el-tabs>     
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="showAddNewDaoVisiable = true;">NEW+
        </el-button>    
        <el-drawer v-model="showAddNewDaoVisiable" v-loading="loadDrawerStatus" direction="rtl" destroy-on-close @opened="onAddNewDaoOpen">
          <template #header>
            <h4>Create A New Green Dao.</h4>   
          </template>
          <template #default>
            <table style="margin-left: 10px;">
              <tr v-if="daoId > 0">
                <td style="width:100px">Id
                  <el-popover
                    placement="top-start"
                    title="Dao Id"
                    :width="200"
                    trigger="hover"
                    content="The id of the green dao."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>
                </td>
                <td style="width:300px">
                  <el-input v-model="daoId" disabled>
                    <template #append>
                      <el-icon @click="onClickToCopy(daoId)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td style="width:100px">Name
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
                  <el-input v-model="daoName">
                    <template #append>
                      <el-icon @click="onClickToCopy(daoName)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>   
              <tr>
                <td style="width:100px">Description
                  <el-popover
                    placement="top-start"
                    title="Dao Description"
                    :width="200"
                    trigger="hover"
                    content="The description about the detail infos of the green dao."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>                  
                </td>
                <td style="width:300px">
                  <el-input v-model="daoDesc" type="textarea" rows="5">
                  </el-input>
                </td>                   
              </tr>     
              <tr>
                <td style="width:100px">Website
                  <el-popover
                    placement="top-start"
                    title="Dao Website"
                    :width="200"
                    trigger="hover"
                    content="The website of the green dao. You can input the url link directly or upload the website folder through the upload button."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>                      
                </td>
                <td style="width:300px">
                  <el-input v-model="daoWebsite">
                    <template #append>
                      <el-icon @click="onClickToCopy(daoWebsite)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>    
              <tr v-loading="loadWebsiteStatus">
                <td style="width:100px"></td>
                <td style="width:300px">
                  <el-upload 
                    style="width: 100px;height: 0px;float: right;margin-right: 80px;"
                    :drag="false"
                    :multiple="true"
                    class="upload-website"
                    ref="uploadWebsite"
                    action=""
                    @change="onChangeSelectWebsiteFolder"
                    @click="onSelectWebsiteFolder"
                    accept=""
                    :limit="0"
                    :show-file-list="false"
                    :auto-upload="false"
                    element-loading-text="Uploading..."
                    :element-loading-spinner="svg"
                    element-loading-svg-view-box="-10, -10, 50, 50"
                    element-loading-background="#ffffff"
                  >
                    <template #trigger>
                      <el-button type="primary" style="float: right;margin-right: 10px;width: 100%;">Select File</el-button>
                    </template>
                  </el-upload>
                  <el-button type="success" style="float: right;" @click="onUploadWebsiteFolder">Upload</el-button>
                </td>
              </tr>
              <tr>
                <td style="width:100px">Avatar
                  <el-popover
                    placement="top-start"
                    title="Dao Avatar"
                    :width="200"
                    trigger="hover"
                    content="The avatar of the green dao. You can input the url link directly or upload the avatar image file through the upload button."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>                   
                </td>
                <td style="width:300px">
                  <el-input v-model="daoAvatarUrl">
                    <template #append>
                      <el-icon @click="onClickToCopy(daoAvatarUrl)"><document-copy /></el-icon>
                    </template>
                  </el-input>
                </td>                   
              </tr>  
              <tr v-loading="loadAvatarStatus">
                <td style="width:100px"></td>
                <td style="width:300px">
                  <el-upload 
                    style="width: 100px;height: 0px;float: right;margin-right: 80px;"
                    :drag="false"
                    :multiple="false"
                    class="upload-avatar"
                    ref="uploadAvatar"
                    action=""
                    @change="onChangeSelectAvatarFile"
                    @click="onSelectAvatarFile"
                    accept="image/*"
                    :limit="1"
                    :show-file-list="false"
                    :on-exceed="handleAvtarExceed"
                    :auto-upload="false"
                    element-loading-text="Uploading..."
                    :element-loading-spinner="svg"
                    element-loading-svg-view-box="-10, -10, 50, 50"
                    element-loading-background="#ffffff"
                  >
                    <template #trigger>
                      <el-button type="primary" style="float: right;margin-right: 10px;width: 100%;">Select File</el-button>
                    </template>
                  </el-upload>
                  <el-button type="success" style="float: right;" @click="onUploadAvatarFile">Upload</el-button>
                </td>
              </tr>  
              <tr v-if="daoId <= 0">
                <td style="width:100px">Type
                  <el-popover
                    placement="top-start"
                    title="Dao Type"
                    :width="200"
                    trigger="hover"
                    content="The type of the green dao. A public dao that every one can join it. And a private dao only the onwer can add the members."
                  >
                    <template #reference>
                     <el-icon><QuestionFilled /></el-icon>
                    </template>
                </el-popover>  
                </td>
                <td style="width:300px;margin-left:0px;">
                  <el-select 
                    v-model="daoPublic"
                    style="width:100%;margin-left:0px;"
                    placeholder="Select Dao Type"
                    :teleported="false"
                    filterable
                  >
                    <el-option key="public" label="Public" :value="true"/>
                    <el-option key="private" label="Private" :value="false"/>
                  </el-select> 
                </td>                   
              </tr>                                                     
            </table>   
          </template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="cancelDaoUpdate">cancel</el-button>
              <el-button type="primary" @click="confirmDaoUpdate">confirm</el-button>
            </div>
          </template>          
        </el-drawer>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DaosPage',
  props: {
  }
}
</script>

<script setup lang="ts">
  
import { getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import { connected, connectState } from "../libs/connect"
import { toRaw } from '@vue/reactivity'
import { genFileId } from 'element-plus'
import * as path from "path"
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile, UploadFiles } from 'element-plus'

import * as constant from "../constant"
import * as tools from "../libs/tools"
import * as storage from '../libs/storage'
import * as element from "../libs/element"
import {GreenDao} from "../libs/greendao"

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const activeName = connectState.activeName;
const showAddNewDaoVisiable = ref(false);

const uploadAvatar = ref<UploadInstance>();
const uploadWebsite = ref<UploadInstance>();
const avatarFileList = ref(new Array());
const websiteFileList = ref(new Array());

const greendao = new GreenDao();

const daoId = ref(0);
const daoName = ref('');
const daoDesc = ref('');
const daoWebsite = ref('');
const daoAvatarUrl = ref('');
const daoPublic = ref(true);
const loadStatus = ref(false);
const loadAvatarStatus = ref(false);
const loadWebsiteStatus = ref(false);
const loadDrawerStatus = ref(false);

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

//on website folder change
const onChangeSelectWebsiteFolder = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  websiteFileList.value = toRaw(uploadFiles);
  
  daoWebsite.value = (websiteFileList.value[0].raw as any).webkitRelativePath.split(path.sep)[0];
  if(daoWebsite.value === ''){
    daoWebsite.value = (websiteFileList.value[0].raw as any).name;
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

      daoWebsite.value = await storage.uploadFolder(directory, toRaw(websiteFileList.value));
    }catch(e){
      element.alertMessage(e);
    }finally{
      loadWebsiteStatus.value = false;
    }
}

//on avatar file change
const onChangeSelectAvatarFile = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  avatarFileList.value = toRaw(uploadFiles);

  daoAvatarUrl.value = (avatarFileList.value[0].raw as any).name;
}

//on click to select avatar file
const onSelectAvatarFile = async () => {
  uploadAvatar.value!.clearFiles();
}

//replace the avatar file from old selected to new one
const handleAvtarExceed: UploadProps['onExceed'] = (files:any) => {
  uploadAvatar.value!.clearFiles()
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadAvatar.value!.handleStart(file);
};

//on click to upload avatar file
const onUploadAvatarFile = async () => {
    try{

      loadAvatarStatus.value = true;

      if(toRaw(avatarFileList.value).length === 0){
        element.elMessage('warning', 'You have not select any file to upload!');
        return;
      }

      daoAvatarUrl.value = await storage.uploadFile(toRaw(avatarFileList.value)[0]);
    }catch(e){
      element.alertMessage(e);
    }finally{
      loadAvatarStatus.value = false;
    }
}

//on click to open the drawer to create a new dao
const onAddNewDaoOpen = async () => {
  daoId.value = 0;
  daoName.value = '';
  daoDesc.value = '';
  daoWebsite.value = '';
  daoAvatarUrl.value = '';
  daoPublic.value = true;

  uploadAvatar.value!.clearFiles();
  uploadWebsite.value!.clearFiles();

  const currentClass = (proxy as any).$el.parentNode.querySelector(".upload-website");

  (currentClass.querySelector(".el-upload__input") as any).webkitdirectory = true;  
}

//on click to cancel dao update
const cancelDaoUpdate = async () => {
  showAddNewDaoVisiable.value = false;
}

//on click to confirm dao update
const confirmDaoUpdate = async () => {
  try{
    loadDrawerStatus.value = true;


    if(daoId.value > 0){
      const tx = await greendao.updateDao(daoId.value, daoName.value, daoDesc.value, daoWebsite.value, daoAvatarUrl.value);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
            const msg = `<div><span>Update dao success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);        
    }else{
      const tx = await greendao.mint(daoName.value, daoDesc.value, daoWebsite.value, daoAvatarUrl.value, daoPublic.value);
      connectState.transactions.value.unshift(tx);
      connectState.transactionCount.value++;
      const msg = `<div><span>Create dao success! Transaction: </span><a href="${transactionExplorerUrl(tx)}" target="_blank">${tx}</a></div>`;
      element.elMessage('success', msg, true);      
    }    

    handleClick();     

  }catch(e){
    element.alertMessage(e);
  }finally{
    loadDrawerStatus.value = false;
    showAddNewDaoVisiable.value = false;
  }
}

//on refresh page
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