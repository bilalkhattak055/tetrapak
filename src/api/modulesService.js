import api from './api'

const ModulesService = {

    getAllModules () {
        return api.get(`modules/get_all_modules`)
    },
}

export default ModulesService;