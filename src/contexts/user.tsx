"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
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

const getInitialStorage = (): Partial<User> | null => {
  let user: Partial<User> | null = null;

  if (typeof window !== "undefined") {
    user =
      (JSON.parse(
        localStorage.getItem("user") as string
      ) as unknown as Partial<User>) ?? null;
  }

  return user;
};

const UserProvider = (props: PropsType) => {
  const [user, setUser] = useState<Partial<User> | null>(getInitialStorage());

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export { useUserContext, UserProvider };
