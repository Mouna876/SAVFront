import axios from 'axios';

const PIECE_API_Base_URL = 'https://localhost:7233/api/Pieces';

class PieceService {
    getPieces() {
        return axios.get(PIECE_API_Base_URL);
    }

    createPiece(piece) {
        return axios.post(PIECE_API_Base_URL, piece);
    }

    getPieceById(id) {
        return axios.get(`${PIECE_API_Base_URL}/${id}`);
    }

    updatePiece(id, piece) {
        return axios.put(`${PIECE_API_Base_URL}/${id}`, piece);
    }

    deletePiece(id) {
        return axios.delete(`${PIECE_API_Base_URL}/${id}`);
    }
}

export default new PieceService();
