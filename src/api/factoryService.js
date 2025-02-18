import api from './api'

const FactoryService = {

    getFactorybyID (factory_id) {
        return api.get(`factory/get_factory/${factory_id}`)
    },
    getAllFactories () {
        return api.get(`factory/get_all_factories`)
    },
    addFactory (payload) {
        return api.post(`factory/add_factory`, payload)
    }, 
   
    deleteFactory (id) {
        return api.delete(`factory/delete_factory/${id}`)
    },
    editFactory (payload) {
        return api.put(`factory/update_factory`, payload)
    },
    changeFactoryStatus(id) {
        return api.put(`factory/update_factory_status/${id}`)
    },
    logoutApi (id) {
        return api.put(`users/logout_time/${id}`)
    },
    updateUserFactory (payload) {
        return api.post(`factory/update_user_factory`, payload)
    },

}

export default FactoryService;