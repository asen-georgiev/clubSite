import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/email";

export function sendEmail(email){
    return httpService
        .post(apiEndpoint,email)
        .then(res => {
           if(res.status===200){
                console.log('Email was sent through API successfully!');
           }
           else{
               console.log('Email was not sent through API!');
           }
        })
        .catch(err => {
            console.log(err);
        });

}
