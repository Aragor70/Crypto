import axios from "axios";

export interface PayloadProps {
    image: File | null,
    key?: File
}

class ApiService {

    hostURL = "http://localhost:8080"

    transform = async ( payload: PayloadProps ) => {

        try {
            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            
            const res = await axios.post(this.hostURL + "/api/xor", payload, options);
            
            return res.data;

        } catch (err) {
            return "We've got an iteral server error. Please try again, later.";
        }

    }
    
}

export default new ApiService;