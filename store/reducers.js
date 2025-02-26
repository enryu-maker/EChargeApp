const initialState = {
    access: null,
    vendor: false,
    location: {},
    station: [],
    profile: {},
    wallet: {},
    vehicle: [],
    slot: [],
    booking: [],
    order: [],
    stationprofile: {},
    income: 0
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCESS':
            return {
                ...state,
                access: action.payload,
            };
        case 'SET_VENDOR':
            return {
                ...state,
                vendor: action.payload,
            };
        case 'SET_ORDER':
            return {
                ...state,
                order: action.payload,
            };
        case 'SET_SPROFILE':
            return {
                ...state,
                stationprofile: action.payload,
            };
        case 'GET_LOCATION':
            return {
                ...state,
                location: action.payload,
            };
        case 'STATION':
            return {
                ...state,
                station: action.payload,
            };
        case 'SET_INCOME':
            return {
                ...state,
                income: action.payload,
            };
        case 'PROFILE':
            return {
                ...state,
                profile: action.payload,
            };
        case 'WALLET':
            return {
                ...state,
                wallet: action.payload,
            };
        case 'VEHICLE':
            return {
                ...state,
                vehicle: action.payload,
            };
        case 'SLOT':
            return {
                ...state,
                slot: action.payload,
            };
        case 'GET_BOOKING':
            return {
                ...state,
                booking: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                access: null,
            };
        default:
            return state;
    }
};

export default mainReducer;
