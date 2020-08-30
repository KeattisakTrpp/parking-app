const initialState = {
    _id: '',
    username: '',
    name: '',
    surname: '',
    tel: '',
    cars: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'LOGIN':
            const { _id , username ,name, surname, tel, cars } = action.payload
            return state = {
                _id, username, name, surname, tel, cars
            }
        default:
            return state
    }
}

export default userReducer
