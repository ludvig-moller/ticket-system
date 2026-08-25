import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function createTicket(): Promise<string | null> {
    try {
        const response = await axios.post(`${API_URL}/api/tickets`);
        const data = response.data;
        
        if (response.status != 201 || !data.id) {
            return null;
        }

        return data.id;
    } catch(err) {
        console.log(err);
        return null;
    }
}
