import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint = "/timedhs";

function timedhUrl(id){
    return `${apiEndpoint}/${id}`;
}


export function createTimeDH(timedh){
    return httpService.post(apiEndpoint,timedh,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getTimeDHs(){
    return httpService.get(apiEndpoint,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getTimeDH(timedhId){
    return httpService.get(timedhUrl(timedhId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function deleteTimeDH(timedhId){
    return httpService.delete(timedhUrl(timedhId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function updateTimeDH(timedh,timedhId){
    const body = {...timedh};
    return httpService.put(timedhUrl(timedhId),body,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}
