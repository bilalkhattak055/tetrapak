import api from './api'

const itService = {
    activityLogs (payload) {
        return api.put(`users/get_activity_log`, payload)
    },
    getLogs () {
        return api.get(`users/get_user_logs`)
    }
   
}

export default itService;