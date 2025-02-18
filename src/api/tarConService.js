import api from "./api"

export const tarConService = {
    tarAndCon(payload) {
        return api.put(`factory_dashboard/get_weekly_areas_targets`, payload);
    },
    targetEdit(payload) {
        return api.post('factory_dashboard/update_area_target', payload)
    },
    areaTarAndCon(payload) {
        return api.put(`factory_dashboard/get_weekly_areas_targets_areaDashboard`, payload)
    },
    areaTargetEdit(payload) {
        return api.post(`factory_dashboard/update_camera_target`, payload)
    }
}