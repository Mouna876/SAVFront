import axios from 'axios';

const CLIENT_API_Base_URL = 'https://localhost:7233/api/clients'

class ClientService{
    getClients(){
        return axios.get(CLIENT_API_Base_URL);
    }
    createClients(client){
        return axios.post(CLIENT_API_Base_URL,client);
    }
    getClientById(id) {
        return axios.get(`${CLIENT_API_Base_URL}/${id}`);
    }
    updateClient(id, client){
        return axios.put(`${CLIENT_API_Base_URL}/${id}`,client);
    }
    deleteClient(id) {
        return axios.delete(`${CLIENT_API_Base_URL}/${id}`);
    }
}
export default new ClientService()