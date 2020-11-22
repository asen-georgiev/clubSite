import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/timetables";

function timetableUrl(id){
    return `${apiEndpoint}/${id}`;
}


export function createTimeTable(timetable){
    return httpService.post(apiEndpoint,timetable,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function getTimeTables(){
    return httpService.get(apiEndpoint,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function getTimeTable(timetableId){
    return httpService.get(timetableUrl(timetableId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function deleteTimeTable(timetableId){
    return httpService.delete(timetableUrl(timetableId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function updateTimeTable(timetable,timetableId){
    const body = {...timetable};
    return httpService.put(timetableUrl(timetableId),body,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}
