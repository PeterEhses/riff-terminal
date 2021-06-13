<template>
<div>
      <Card 
    v-for="(card, index) in cards"       
    :key="card.title"
    :card="card"
    :is-current="index === 0"
    >
    
    </Card>
</div>
</template>

<script>
import Card from '@/components/cards/Card.vue'
export default {
    props: {
      cards: {
        type: Array,
        required: true
      }
    },
    components: {
        Card,
    }

}
</script>

<style lang="scss">

</style>