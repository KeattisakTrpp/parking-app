export const login = (res) => {
    return {
        type: 'LOGIN',
        payload: res
    }
}

export const park = (res) => {
    return {
        type: 'PARK',
        payload: res
    }
}
