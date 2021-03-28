

export const intitialState = {
  basket: [],
  user: null,
  data:[]
};
  

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        data: action.data,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default reducer;


  