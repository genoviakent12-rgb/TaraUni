
import { View, Text } from 'react-native'
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

  const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //load the user from storage on start of the launch 
  useEffect(() => { 
    const loadStoredUser = async () => { 
      //finds the user using getItem function
      try { 
        const storedUser = await AsyncStorage.getItem("user");
        // if user is present, set the user state
        if (storedUser) { 
          setUser(JSON.parse(storedUser));
        }
      } catch (e) { 
        console.error("Failed to load stored user:", e);
      } finally {
        setIsLoading(false);
      }
    };
    //call the function and load user 
    loadStoredUser();
  }, []);

  //save user data when logging in
  const loginUser = async (userData) => {
    setUser(userData); 
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  //clear user data when logging out
  const logoutUser = async () => { 
    setUser(null);
    await AsyncStorage.removeItem("user");
  }

  return ( 
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

//customized hook to consume user data anywhere
export const useAuth = () => useContext(AuthContext);
