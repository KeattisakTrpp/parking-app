const initialState = {
    _id: '',
    username: '',
    name: '',
    surname: '',
    tel: '',
    cars: [],
    parkings: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type){    
        case 'LOGIN':
            const { _id , username ,name, surname, tel, cars, parkings } = action.payload
            return state = {
                _id, username, name, surname, tel, cars, parkings
            }
        case 'PARK': 
            return state = {
                ...state,
                parkings: [...action.payload]
            }
        default:
            return state
    }
}

export default userReducer
