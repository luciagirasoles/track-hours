function init() {
  return { role: null, name: null };
}

export default function reducer(state = init(), action) {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        role: action.payload.role,
        name: action.payload.name
      };
    case "reset":
      return init();
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
