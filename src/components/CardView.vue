<template>
    <div class="custom-card">
        <div class="card-title">
            <div class="title-left-bar"></div>
            <div class="title-text">{{title}}</div>
        </div>
        <div class="card-content">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    }
});
</script>

<style scoped>
.custom-card {
    position: relative;
    color: #fff;
    overflow: hidden;
    width: 25vw;
    height: 25vh;
    /* min-height: 270px; */
}

/* L型边角装饰：左上角 */
.custom-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 2vw;
  height: 2vw;
  border-top: 0.15vw solid #114D6F;
  border-left: 0.15vw solid #114D6F;
}

/* L型边角装饰：右下角 */
.custom-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 2vw;
  height: 2vw;
  border-bottom: 0.15vw solid #114D6F;
  border-right: 0.15vw solid #114D6F;
}

.custom-card::before {
    top: 0;
    left: 0;
    border-top-left-radius: 0.2vw;
}

.custom-card::after {
    bottom: 0;
    right: 0;
    border-bottom-right-radius: 0.2vw;
}

/* 标题区域 */
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

.title-text {
    font-size: 1.8vh;
    font-weight: bold;
}

/* 内容区域 */
.card-content {
    font-size: 1vw;
    line-height: 1.6;
}
</style>