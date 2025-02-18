import api from "./api"


export const analyticsPageService = {
    alertsTrend(payload) {
        return api.put(`/factory_dashboard/alert_trend_live_analytics`, payload);
    },
    highSevrityF(payload) {
        return api.put(`get_high_severity/get_high_severity`,payload)
    }
}