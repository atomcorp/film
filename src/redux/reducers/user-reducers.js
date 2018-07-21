const user = (
  state = {
    name: '',
    id: '',
    email: '',
    collections: [],
    watched: [],
    loved: [],
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
