import httpService from "./httpService";
import { apiUrl } from "../config.json";
import {getCurrentUser} from "./loginService";

const apiEndpoint = apiUrl + "/clubbio";

export function createClubBio(clubBio){
    return httpService.post(apiEndpoint,clubBio,{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}

export function getClubBio(){
    return httpService.get(apiEndpoint);
}
