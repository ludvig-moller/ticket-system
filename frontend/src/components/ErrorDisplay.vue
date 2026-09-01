
<script setup lang="ts">
import { errors } from '@/states/errors';

const click = () => {
    errors.value = [];
}
</script>

<template>
    <div v-if="errors.length != 0" id="errorDisplay">
        <div id="errors">
            <p id="error" v-for="error in errors">
                {{ error }}
            </p>
        </div>
        <button @click="click">Clear Errors</button>
    </div>
</template>
