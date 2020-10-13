import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";


const apiEndpoint = apiUrl + "/news";

export function createNews(news){
    return httpService.post(apiEndpoint,news,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

