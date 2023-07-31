"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface UserContextType {
  user: Partial<User> | null;
  setUser: Dispatch<SetStateAction<Partial<User> | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface PropsType {
  children: ReactNode;
}

const useUserContext = () => useContext(UserContext);

const UserProvider = (props: PropsType) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
