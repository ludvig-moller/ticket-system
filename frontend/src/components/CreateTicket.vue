
<script setup lang="ts">
import { ref } from 'vue';
import { createTicket } from '@/services/ticketService';
import { reloadTickets } from '@/states/reloadTickets';
import axios from 'axios';
import { errors } from '@/states/errors';

const ticketId = ref("");

const click = async () => {
    try {
        const res = await createTicket();
        ticketId.value = res;
        reloadTickets.value++;
    } catch(err) {
        if (axios.isAxiosError(err)) {
            errors.value.push("Got a server error when creating ticket.");
        } else {
            errors.value.push("Something went wrong when creating ticket.");
        }
    }
}
</script>

<template>
    <div id="createTicket">
        <button @click="click">Create a Ticket</button>

        <p> 
            {{ ticketId }}
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
