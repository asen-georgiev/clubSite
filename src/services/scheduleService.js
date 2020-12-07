import httpService from "./httpService";
import {getCurrentUser} from "./loginService";

const apiEndpoint = "/schedules";

function scheduleUrl(id) {
    return `${apiEndpoint}/${id}`;
}


//Creating single Schedule
export function createSchedule(schedule) {
    return httpService.post(apiEndpoint, schedule, {
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


//Get all the schedules
export function getSchedules() {
    return httpService.get(apiEndpoint);
}


//Get a single Schedule
export function getSchedule(scheduleId) {
    return httpService.get(scheduleUrl(scheduleId), {
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


//Update a single Shcedule
export function updateSchedule(schedule, scheduleId) {
    const body = {...schedule};
    return httpService.put(scheduleUrl(scheduleId), body, {
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}


//Delete a single Schedule
export function deleteSchedule(scheduleId) {
    return httpService.delete(scheduleUrl(scheduleId), {
        headers: {
            'x-auth-token': getCurrentUser()
        }
    });
}
