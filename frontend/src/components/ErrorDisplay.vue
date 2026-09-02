
<script setup lang="ts">
import { errors } from '@/states/errors';

const click = () => {
    errors.value = [];
}
</script>

<template>
    <div v-if="errors.length != 0" id="errorDisplay">
        <div id="errors">
            <p class="error" v-for="error in errors">
                {{ error }}
            </p>
        </div>
        <button @click="click">Clear Errors</button>
    </div>
</template>

<style>
#errorDisplay {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

@media only screen and (min-width: 1300px) {
    #errorDisplay {
        width: 300px;
        position: absolute;
        left: calc(100% - 320px);
        top: 20px;
    }
}

#errors {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.error {
    padding: 5px;
    width: 300px;
    border: 2px;
    border-style: solid;
    border-radius: 20px;
    border-color: red;
}
</style>
