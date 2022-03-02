const userReducer = (state = null, action) => {
    switch (action.type) {
        case "ADDUSER":
            return action.payload;
        case "DELETEUSER":
            return null;
        default:
            return state;
    }
};

export default userReducer;
