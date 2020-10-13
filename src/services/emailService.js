import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/email";

export function sendEmail(email){
    return httpService
        .post(apiEndpoint,email)
        .then(response => {
            if (response.status===200) {
                console.log("It worked!")
                };
            return response.data;
        });
}
