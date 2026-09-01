
<script setup lang="ts">
import { deleteTicket } from '@/services/ticketService';

const props = defineProps({
    ticketId: String,
});

const click = async () => {
    await deleteTicket(props.ticketId!);
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
