import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/clubbio";

function clubBioUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function createClubBio(clubBio){
    return httpService.post(apiEndpoint,clubBio,{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getClubBios(){
    return httpService.get(apiEndpoint);
}

export function deleteClubBio(bioId){
    return httpService.delete(clubBioUrl(bioId),{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}
