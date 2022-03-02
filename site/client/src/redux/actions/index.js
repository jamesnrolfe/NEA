export const addUser = userdata => {
    return {
        type: "ADDUSER",
        payload: userdata,
    };
};

export const removeUser = () => {
    return {
        type: "DELETEUSER",
    };
};
