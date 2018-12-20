<template>
<button class="ui-btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.ui-btn {
    background-color: #f9bf62;
    border: 5px solid #333;
    font-family: 'Amatic SC', cursive;
    font-size: 30px;
    font-weight: bold;
    position: relative;
    width: 200px;

    &:active {
        background-color: #faddb3;
    }
}
</style>
