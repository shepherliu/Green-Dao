<template>
  <div class="file-arae">
    <el-container>
      <el-header style="background-color: #ffffff;">
        <el-tabs v-model="activeName" class="file-tabs" @tab-click="handleClick">
          <el-tab-pane label="All" name="all"></el-tab-pane>
          <el-tab-pane label="Mine" name="mine"></el-tab-pane>
        </el-tabs>     
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;">NEW+
        </el-button>         
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LearningsPage',
  props: {
  }
}
</script>

<script setup lang="ts">
  
import { ref } from "vue"
import { connected, connectState } from "../libs/connect"
import * as tools from "../libs/tools"

const activeName = connectState.activeName;
const loadStatus = ref(false);

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