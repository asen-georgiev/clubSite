import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/schedules";

function scheduleUrl(id){
    return `${apiEndpoint}/${id}`;
}



export function createSchedule(schedule){
    return httpService.post(apiEndpoint,schedule,{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getSchedules(){
    return httpService.get(apiEndpoint);
}

export function getSchedule(scheduleId){
    return httpService.get(scheduleUrl(scheduleId),{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}

export function updateSchedule(schedule,scheduleId){
    const body = {...schedule};
    return httpService.put(scheduleUrl(scheduleId),body,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}



export function deleteSchedule(scheduleId){
    return httpService.delete(scheduleUrl(scheduleId),{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    })
}
