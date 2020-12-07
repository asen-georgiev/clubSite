import httpService from "./httpService";

const apiEndpoint = "/email";

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
