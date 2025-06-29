<template>
    <div class="card-item">
      <h2 class="card-title">{{ title }}</h2>
      <div class="card-content">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String
  })
  </script>
  
  <style scoped>
  .card-item {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .card-title {
    font-size: 18px;
    font-weight: bold;
  }
  .card-content {
    padding: 8px 0;
  }
  </style>
  