import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint = "/email";

function emailUrl(id){
    return `${apiEndpoint}/${id}`;
}

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

export function getEmails(){
    return httpService.get(apiEndpoint,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function deleteEmail(emailId){
    return httpService.delete(emailUrl(emailId),{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}
