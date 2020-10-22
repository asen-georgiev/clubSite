import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/events";

export function createEventCalendar(eventCalendar){
    return httpService.post(apiEndpoint,eventCalendar,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getEventCalendar(){
    return httpService.get(apiEndpoint);
}
