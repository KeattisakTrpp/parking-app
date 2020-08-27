const initialState = {
    username: '',
    name: '',
    surname: '',
    tel: '',
    cars: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'LOGIN':
            const { username ,name, surname, tel, cars } = action.payload
            return state = {
                username, name, surname, tel, cars
            }
        default:
            return state
    }
}

export default userReducer
