const defaultState = {
  name: '',
  id: '',
  email: '',
  collections: [],
  watched: [],
  loved: [],
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
