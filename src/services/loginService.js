import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

export function loginUser (data){
    return httpService
        .post(apiEndpoint,data)
        .then(response =>{
            if(response.data){
            localStorage.setItem("user",response.data);
            }
            return response.data;
        });
}

export function logoutUser (){
    localStorage.removeItem("user");
}

export function getCurrentUser(){
    return localStorage.getItem("user");
}
