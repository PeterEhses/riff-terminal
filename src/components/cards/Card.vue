<template>
    <div
        class="card"
        :class="{ isCurrent: isCurrent }"
    >
    <h3 class="cardTitle">{{ card.title }}</h3>
    </div>
</template>

<script>
export default {
      props: {
    card: {
      type: Object,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  }

}
</script>

<style lang="scss">
    .card{
        --size-x: calc(var(--card-width) * var(--unit-width));
        width: var(--size-x);
        height: calc(var(--size-x) * var(--card-aspect));
        margin: var(--unit-md);
        background: var(--color-blue);
        
    }
</style>