
<script setup lang="ts">
import { ref } from 'vue';
import { createTicket } from '@/services/ticketService';
import { reloadTickets } from '@/states/reloadTickets';

const ticketId = ref("");
const error = ref("");

const click = async () => {
    const res = await createTicket();

    if (res != null) {
        ticketId.value = res;
        error.value = "";
        
        reloadTickets.value++;
    }
    else {
        error.value = "Something went wrong.";
        ticketId.value = "";
    }
}
</script>

<template>
    <div id="createTicket">
        <button @click="click">Create a Ticket</button>

        <p v-if="!error"> 
            {{ ticketId }}
        </p>

        <p v-else class="error">
            {{ error }}
        </p>
    </div>
</template>

<style lang="css" scoped>
#createTicket {
    display: flex;
    justify-content: start;
    gap: 40px;
}
</style>
