import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint = "/images";

export function uploadImage(data) {
    return httpService
        .post(apiEndpoint, data, {
            headers: {
                'x-auth-token': getCurrentUser()
            }
        })
        .then(response => {
            console.log(response.statusText)
        });
}

export function getImages(){
    return httpService
        .get(apiEndpoint)
}
