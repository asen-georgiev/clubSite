import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/users";

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
