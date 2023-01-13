<template>
  <div class="file-arae">
    <el-container>
      <el-header style="background-color: #ffffff;">
        <el-tabs v-model="activeName" class="file-tabs" @tab-click="handleClick">
          <el-tab-pane label="Balance" name="balance"></el-tab-pane>
        </el-tabs>   
        <el-input v-model="searchAddress" placeholder='0' size="small" style="width: 350px;"></el-input>  
        <el-button type="primary" size="small" @click="handleClick">Search
        </el-button>   
      </el-header>
      <el-main
        style="height: 450px;margin-top: 20px;" 
        v-loading="loadStatus"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="#ffffff"
      >
        <el-row :gutter="20">
          <table v-if="activeName === 'balance'" style="margin-left:150px">
            <thead>
              <th style="width:100px">DaoId</th>
              <th style="width:100px">Token</th>
              <th style="width:400px">Contract</th>
              <th style="width:100px">Amount</th>
            </thead>
            <tbody>
              <template v-for="info in treassureList" :key="info.daoId+info.token">
                <tr>
                  <td style="width:100px">
                    {{info.daoId}}
                  </td>
                  <td style="width:100px">
                    {{info.name}}
                  </td>
                  <td style="width:400px">
                    <el-link type="success" target="_blank" :href="addressExplorerUrl(info.token)">{{info.token}}</el-link>
                    <el-icon @click="onClickToCopy(info.token)"><document-copy /></el-icon>
                  </td>
                  <td style="width:100px">
                    {{info.amount}}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </el-row>
      </el-main>
      <el-footer>
        <div>
          <el-button type="primary" style="margin-top: 10px;" @click="onHandlePrev">Prev
          </el-button>
          <el-button type="primary" style="margin-top: 10px;" @click="onHandleNext" :disabled="!hasMore">Next
          </el-button>
      </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TreassuresPage',
  props: {
  }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

import { connected, connectState } from "../libs/connect"
import * as tools from "../libs/tools"
import * as covalent from "../libs/covalent"

import { greenVoteContractAddress, chainList } from "../constant"

import { GreenDao } from "../libs/greendao"
import { GreenVote } from "../libs/greenvote"

// const userAddr = connectState.userAddr;
const searchAddress = ref('');

const activeName = connectState.activeName;
const loadStatus = ref(false);

const greendao = new GreenDao();
const greenvote = new GreenVote();

const treassureList = ref(new Array());
const hasMore = ref(false);
const pageSize = ref(10);
const pageCount = ref(0);

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

//address explore url
const addressExplorerUrl = (address:string) => {
  for(const i in chainList){
    if(connectState.chainId === chainList[i].chainId){
      const blockExplorerUrls = chainList[i].blockExplorerUrls;
      return `${blockExplorerUrls}/address/${address}`
    }
  }
  return address;
}    

const getTreassureCount = async (searchDaoId:number) => {
  const newList = new Array();

  const tokens = new Array();
  let nativeCurrency = 'ETH';
  for(let i = 0; i < chainList.length; i++){
    if(chainList[i].chainId === connectState.chainId){
      nativeCurrency = chainList[i].nativeCurrency;
      break;
    }
  }

  tokens.push({
    name: nativeCurrency,
    contract: "0x0000000000000000000000000000000000000000",
    decimals: 18,
  });

  const tokenInfos = await covalent.getTokenBalancesForAddress(connectState.chainId, greenVoteContractAddress[connectState.chainId]);
  for (let i = tokenInfos.length-1; i>=0; i--){
    const item = tokenInfos[i];

    if(item.type === 'nft'){
      continue;
    }

    if(item.balance === null || parseInt(item.balance) === 0){
      continue;
    }

    tokens.push({
      name: item.contract_ticker_symbol,
      contract: item.contract_address,
      decimals: item.contract_decimals,
    });
  }

  const total = await greendao.getDaoTotalCount();
  let count = 0;

  for(let i = 0; i <= total/10; i++){
    let indexs;
    if(searchDaoId > 0){
      indexs = [searchDaoId];
    }else{
      indexs = await greendao.getDaoIndexsByPageCount(10, i, false);
    }

    for(let j = 0; j < indexs.length; j++){
      const daoId = indexs[j];
      for(let k = 0; k< tokens.length; k++){

        try{
          const balance = await greenvote.getDaoTreassure(daoId, tokens[k].contract);

          if(balance <= 0){
            continue;
          }else{
            count++;
          }

          if(pageSize.value*pageCount.value > count){
            continue;
          }

          if(count > pageSize.value*(pageCount.value+1)){
            break;
          }

          newList.push({
            daoId: daoId,
            token: tokens[k].contract,
            name: tokens[k].name,
            amount: balance,
          })
        }catch(e){
          continue;
        }

      }
    }

    if(searchDaoId > 0){
      break;
    }
  }

  if(newList.length < pageSize.value){
    hasMore.value = false;
  }else{
    hasMore.value = true;
  }

  treassureList.value = newList;
}
//on click for prev page
const onHandlePrev = async () => {
  if(pageCount.value > 0){
    pageCount.value--;
  }
  handleClick();
}

//on click for next page
const onHandleNext = async () => {
  if(hasMore.value){
    pageCount.value++;
  }
  handleClick();
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
      treassureList.value = new Array();
      return;
    }

    if(pageCount.value < 0){
      pageCount.value = 0;
    }

    let searchDaoId = parseInt(searchAddress.value);
    if(isNaN(searchDaoId)){
      searchDaoId = 0;
    }

    await getTreassureCount(searchDaoId);

  }catch(e){
    treassureList.value = new Array();
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
  if(activeName.value != 'balance'){

    activeName.value = 'balance';
  }
}catch(e){
  activeName.value = 'balance';
}

//update page size
handleClick();  
</script>