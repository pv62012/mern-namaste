

export const intitialState = {
  basket: [],
  user: null,
  data: [],
  followers: [],
  following:[]
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
    case "UPDATE":
      return {
        ...state,
        followers: action.payload.followers,
        following:action.payload.following,
      }
    case "UPDATEPIC":
      return {
        ...state,
        pic:action.payload
      }
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


  