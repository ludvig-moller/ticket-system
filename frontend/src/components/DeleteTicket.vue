
<script setup lang="ts">
import { deleteTicket } from '@/services/ticketService';
import { reloadTickets } from '@/states/reloadTickets';

const props = defineProps({
    ticketId: String,
});

const click = async () => {
    await deleteTicket(props.ticketId!);
    reloadTickets.value++;
}
</script>

<template>
    <button @click="click" id="deleteButton">Delete</button>
</template>

<style>
#deleteButton {
    background-color: red;
}
</style>
