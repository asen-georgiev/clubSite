import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint = "/courses";

function courseUrl(id){
    return `${apiEndpoint}/${id}`;
}


export function createCourse(course){
   return httpService.post(apiEndpoint,course,{
       headers: {
           'x-auth-token': getCurrentUser()
       }
   });
}

export function getCourses(){
    return httpService.get(apiEndpoint,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function getCourse(courseId){
    return httpService.get(courseUrl(courseId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}

export function updateCourse(course,courseId){
    const body={...course};
    return httpService.put(courseUrl(courseId),body,{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


export function deleteCourse(courseId){
    return httpService.delete(courseUrl(courseId),{
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}
