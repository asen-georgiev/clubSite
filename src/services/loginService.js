import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

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

export function getCurrentUser(){
    return sessionStorage.getItem("user");
}
