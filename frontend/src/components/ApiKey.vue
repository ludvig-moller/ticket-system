
<script setup lang="ts">
import { ref } from 'vue';
import { apiKey } from '@/states/apiKey';

const localApiKey = localStorage.getItem("apiKey");
if (localApiKey != null) {
    apiKey.value = localApiKey;
}

const newApiKey = ref("");

const click = () => {
    apiKey.value = newApiKey.value;
    localStorage.setItem("apiKey", newApiKey.value);
    newApiKey.value = "";
}
</script>

<template>
    <div id="apiKey">
        <input v-model="newApiKey" id="newApiKey" placeholder="Enter the API key" type="password" />
        <button @click="click">Set</button>
    </div>
</template>

<style>
#apiKey {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}
</style>
