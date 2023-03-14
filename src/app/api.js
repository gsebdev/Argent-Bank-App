
async function apiFetch({ endpoint, method, token = null, body = null }) {

    const response = await fetch(process.env.REACT_APP_API_BASE_URL + endpoint, {
        method: method,
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'authorization': token ? 'Bearer ' + token : ''
        },
        body: body ? JSON.stringify(body) : null

    })
    const data = await response.json()
    if(response.ok) {
        return data
    } else {
        throw data
    }
}

export const api = {
    login: async (payload) => await apiFetch({
            endpoint: 'user/login',
            method: 'POST',
            body: payload
        }),
    signup: async (payload) => await apiFetch({
            endpoint: 'user/signup',
            method: 'POST',
            body: payload
        }),

    getProfile: async (token) => await apiFetch({
            endpoint: 'user/profile',
            method: 'POST',
            token: token
        }),

    modifyProfile: async (token, payload) => await apiFetch({
            endpoint: 'user/profile',
            method: 'PUT',
            token: token,
            body: payload
        })
}