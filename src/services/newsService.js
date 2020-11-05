import httpService from "./httpService";
import {apiUrl} from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/news";

function anewUrl(id) {
    return `${apiEndpoint}/${id}`;
}


//Create single New
export function createNews(news) {
    return httpService.post(apiEndpoint, news, {
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


//Get all the news
export function getNews() {
    return httpService
        .get(apiEndpoint)
}


//Get a single New
export function getNew(anewId) {
    return httpService
        .get(anewUrl(anewId), {
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}


//Updating single New
export function updateNew(anew, anewId) {
    const body = {...anew};
    return httpService
        .put(anewUrl(anewId), body, {
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}


//Delete a single New
export function deleteNew(anewId) {
    return httpService
        .delete(anewUrl(anewId), {
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}
