<template>
  <DaosPage v-if="activeIndex==='1'"/>  
</template>

<script lang="ts">

import DaosPage from './DaosPage.vue';

export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<script setup lang="ts">
import { connectState } from "../libs/connect"

const activeIndex = connectState.activeIndex;
</script>