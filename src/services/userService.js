import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/users";

//function for retrieving single user by ID
function userUrl(id){
    return `${apiEndpoint}/${id}`;
}

//Показване на един юзър
export function getUser(userId){
    return httpService.get(userUrl(userId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    })
}


//Показване на всички юзъри
export function getUsers(){
    return httpService.get(apiEndpoint, {
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

//Функция за регистрация на юзър
export function registerUser(user){
    return httpService.post(apiEndpoint,user,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getLoggedUser(){
    return httpService.get(apiEndpoint+"/me",{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    })
}
