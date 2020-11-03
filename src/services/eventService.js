import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/events";

function eventCalendarUrl(id){
    return `${apiEndpoint}/${id}`;
}


export function createEventCalendar(eventCalendar){
    return httpService.post(apiEndpoint,eventCalendar,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function getEventCalendar(eventCalendarId){
    return httpService.get(eventCalendarUrl(eventCalendarId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}



export function getEventsCalendar(){
    return httpService.get(apiEndpoint,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function updateEventCalendar(eventCalendar,eventCalendarId){
    const body = {...eventCalendar};
    return httpService.put(eventCalendarUrl(eventCalendarId),body,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function deleteEventCalendar(eventCalendarId){
    return httpService.delete(eventCalendarUrl(eventCalendarId),{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}
