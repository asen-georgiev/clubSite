import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint = "/users";

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
    });
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

//Функция, която показва конкретно логнатия юзър
export function getLoggedUser(){
    return httpService.get(apiEndpoint+"/me",{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

//Функция за ъпдейт на юзър, задължително трябва да се подаде и обекта и ИД то на юзъра!
export function updateUser(user,userId) {
    //Ако във userUpdateForm в субмит метода подадем _id в обекта, тогава може да се мине към коментирания вариант.
    // if (userId) {
        const body = {...user};
        // delete body._id;
        return httpService.put(userUrl(userId), body,{
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
    // }
}

//Функция за изтриване на Юзър
export function deleteUser(userId){
    return httpService.delete(userUrl(userId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}
