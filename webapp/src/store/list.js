const list = (state = 'Category', action) => {
    switch (action.type) {
        case 'Select_List':
            return action.active;
        default:
            return state;
    }
}

export default list;