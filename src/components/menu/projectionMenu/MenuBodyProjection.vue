<template>
    <div class="menu-projection">
        <TextsEditor />
    </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import TextsEditor from './TextsEditor.vue'
export default {
    components: {
        TextsEditor,

    }
    // computed: {
    //     ...mapGetters('projection', {
    //         getTexts: "getTexts"
    //     })
    // }
};
</script>

<style>
</style>