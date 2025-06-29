<template>
    <div class="custom-card">
      <div class="card-title">
        <div class="title-left-bar"></div>
        <div class="title-tabs">
          <span
            v-for="(t, i) in tabs"
            :key="i"
            :class="['tab-item', { active: i === currentTab }]"
            @click="handleTabClick(i)"
          >
            {{ t }}
            <span v-if="i < tabs.length - 1" class="separator">|</span>
          </span>
        </div>
      </div>
      <div class="card-content">
        <slot :active-index="currentTab" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    tabs: {
      type: Array,
      required: true,
    },
    modelValue: {  // 添加modelValue prop
      type: Number,
      default: 0
    }
  })
  
  const emit = defineEmits(['update:modelValue'])  // 定义emit
  
  const currentTab = ref(props.modelValue)
  
  // 监听外部变化
  watch(() => props.modelValue, (newVal) => {
    currentTab.value = newVal
  })
  
  // 点击tab时触发更新
  function handleTabClick(index) {
    currentTab.value = index
    emit('update:modelValue', index)
  }
  </script>
  
  <style scoped>
  .custom-card {
    position: relative;
    color: #fff;
    overflow: hidden;
    /* width: 75vw; */
    height: 25vh;
  }
  
  .custom-card::before,
  .custom-card::after {
    content: "";
    position: absolute;
    width: 2vw;
    height: 2vw;
    border: 0.15vw solid transparent;
  }
  
  .custom-card::before {
    top: 0;
    left: 0;
    border-top-color: #114D6F;
    border-left-color: #114D6F;
    border-top-left-radius: 0.2vw;
  }
  
  .custom-card::after {
    bottom: 0;
    right: 0;
    border-bottom-color: #114D6F;
    border-right-color: #114D6F;
    border-bottom-right-radius: 0.2vw;
  }
  
  .card-title {
    display: flex;
    align-items: center;
  }
  
  .title-left-bar {
    width: 0.2vw;
    margin: 1vw;
    height: 2vh;
    background-color: #03EBF6;
    margin-right: 0.6vw;
  }
  
  .title-tabs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.8vh;
    font-weight: bold;
  }
  
  .tab-item {
    cursor: pointer;
    color: #fff;
    transition: color 0.3s;
  }
  
  .tab-item.active {
    color: #03EBF6;
  }
  
  .separator {
    margin: 0 0.4vw;
    color: #ccc;
  }
  .card-content {
    font-size: 1vw;
    line-height: 1.6;
    padding-top: 1vh;
  }
  </style>
  