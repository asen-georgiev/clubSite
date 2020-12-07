import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint ="/clubbio";

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

export function getClubBio(bioId){
    return httpService.get(clubBioUrl(bioId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function updateClubBio(clubBio,bioId){
    const body = {...clubBio};
    return httpService.put(clubBioUrl(bioId), body,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function deleteClubBio(bioId){
    return httpService.delete(clubBioUrl(bioId),{
        headers:{
            'x-auth-token': getCurrentUser()
        }
    });
}
