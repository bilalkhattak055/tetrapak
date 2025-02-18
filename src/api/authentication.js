import api from './api'

const AuthenticationService = {

    userSignIn (payload) {
        return api.post('users/login_with_email',payload)
    },

}

export default AuthenticationService;