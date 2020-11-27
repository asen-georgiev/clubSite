import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

//Подава данните от фронтенда (юзър имейл и парола) като req към сървъра,
//В бекенда извика router.post функцията.
//след което зима риспонза който е юзър с токен и го запазва в сесията на браузъра
//и вече тея данни се ползват за аутентикации т.н.
export function loginUser (data){
    return httpService
        .post(apiEndpoint,data)
        .then(response =>{
            if(response.data){
            sessionStorage.setItem("user",response.data);
            }
            return response.data;
        });
}

export function logoutUser (){
    sessionStorage.removeItem("user");
}

//Извиква юзъра с токен, който е запазен в сесията на браузъра
export function getCurrentUser(){
    return sessionStorage.getItem("user");
}
