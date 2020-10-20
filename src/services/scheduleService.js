import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/schedules";

export function createSchedule(schedule){
    return httpService.post(apiEndpoint,schedule,{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getSchedule(){
    return httpService
        .get(apiEndpoint);
}
