import axios from "axios";
import { apiKey } from "@/states/apiKey";
import type { Ticket } from "@/types/ticket";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTickets(): Promise<Ticket[]> {
    const response = await axios.get(`${API_URL}/api/tickets`, {
        headers: {
            "x-api-key": apiKey.value
        }
    });

    return response.data;
}

export async function createTicket(): Promise<string | null> {
    const response = await axios.post(`${API_URL}/api/tickets`);
    return response.data.id;
}

export async function useTicket() {
    
}
