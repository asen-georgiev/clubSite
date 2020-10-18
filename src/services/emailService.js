import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/email";

export function sendEmail(email){
    return httpService
        .post(apiEndpoint,email)
        .then(res => {
           if(res.status===200){
                console.log('Everything ok!');
           }
           else{
               console.log('Not Ok');
           }
        })
        .catch(err => {
            console.log(err);
        });

}
