import httpService from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/images";

export function uploadImage(data) {
    return httpService
        .post(apiEndpoint, data)
        .then(response => {
            console.log(response.statusText)
        });
}
