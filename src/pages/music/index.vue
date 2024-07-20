<template>
    <div>
        <h1>Music在线</h1>
        <audio controls @play="play">
            <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mpeg"
            />
        </audio>
        <h1>图片</h1>
        <img :src="testImage" alt="图片" style="width: 200px; height: auto" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Image from '@/assets/image.png';

export default defineComponent({
    name: 'MusicPlayer',
    methods: {
        play() {
            console.log('play');
        },
    },
    data() {
        return {
            testImage: Image,
        };
    },
    created() {
        console.log('created');
    },
});
</script>

<style scoped>
@import './styles/index.css';
</style>
