import React from "react";
import reducer from "../reducer/UserReducer";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function UserProvider({ children }) {
  const [state, setState] = React.useReducer(reducer);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={setState}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch };
