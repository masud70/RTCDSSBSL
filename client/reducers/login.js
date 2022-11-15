const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return true;
        default:
            return false;
    }
}

export default loggedReducer;