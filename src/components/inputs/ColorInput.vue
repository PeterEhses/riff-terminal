<template>
  <colorPicker v-model="colors" @input="handleInput">yee</colorPicker>
</template>

<script>
import {Chrome} from 'vue-color';
export default {
    props: {
        value: {
            default: '#fff'
        }
    },
    components: {
        colorPicker: Chrome,
    },
    data(){
        return{
            colorType: this.detectValueColorType(),
            colors: this.value,
        }
    },
    computed: {
        colorAsString(){
            if(typeof(this.colors) == 'string'){
                return this.colors
            }
            if(this.colorType == 'hex'){
                return this.colors.hex
            }
            if(this.colorType == 'hex8'){
                return this.colors.hex8
            }
            if(this.colorType == 'rgb'){
                return "rgb("+
                this.colors.rgba.r+", "+
                this.colors.rgba.g+", "+
                this.colors.rgba.b+
                ")"
            }
            if(this.colorType == 'rgba'){
                return "rgba("+
                this.colors.rgba.r+", "+
                this.colors.rgba.g+", "+
                this.colors.rgba.b+", "+
                this.colors.rgba.a+
                ")"
            }
            if(this.colorType == 'hsv'){
                return "hsv("+
                this.colors.hsv.h+", "+
                this.colors.hsv.s+", "+
                this.colors.hsv.v+
                ")"
            }
            if(this.colorType == 'hsva'){
                return "hsva("+
                this.colors.hsv.h+", "+
                this.colors.hsv.s+", "+
                this.colors.hsv.v+", "+
                this.colors.hsv.a+
                ")"
            }
            if(this.colorType == 'hsl'){
                return "hsl("+
                this.colors.hsl.h+", "+
                this.colors.hsl.s+", "+
                this.colors.hsl.v+
                ")"
            }
            if(this.colorType == 'hsla'){
                return "hsla("+
                this.colors.hsl.h+", "+
                this.colors.hsl.s+", "+
                this.colors.hsl.v+", "+
                this.colors.hsl.a+
                ")"
            }
            return this.colors
        }
    },
    methods: {
        handleInput(){
            if(this.colorType){
                this.$emit('input', this.colorAsString);
            } else {
                this.$emit('input', this.colors);
            }
            
        },
        detectValueColorType(){
            if(typeof(this.value) !== "string"){
                return false
            }
            if(this.value.substring(0,1) === "#"){
                if(this.value.length == 9){
                    return "hex8"
                } else if(this.value.length == 7){
                    return "hex"
                } else {
                    return false
                }
            } else if(this.value.substring(0,3) === "rgb"){
                if(this.value.substring(3,4) === "a"){
                    return "rgba"
                } else {
                    return "rgb"
                }
            } else if(this.value.substring(0,3) === "hsl"){
                if(this.value.substring(3,4) === "a"){
                    return "hsla"
                } else {
                    return "hsl"
                }
            } else if(this.value.substring(0,3) === "hsv"){
                if(this.value.substring(3,4) === "a"){
                    return "hsva"
                } else {
                    return "hsv"
                }
            }
            return false
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler(){
                this.colorType = this.detectValueColorType();
                Logger.debug("Colorpicker got a color:", this.value)
                this.colors = this.value
            }
        }
    }
}
</script>

<style>

</style>