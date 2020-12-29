<template>
  <div class="card card-max-width">
    <div class="card-title">
      <slot name="title"></slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-max-width {
  max-width: 360px;
}
.card {
  border-radius: 8px;
  border: 1px solid #d6d9dc;
  display: inline-block;
  margin: 0.23em;
  font-style: normal;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 140%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
