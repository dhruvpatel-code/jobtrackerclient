import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';


// Define a type for the Auth context state
type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  checkAuthentication: () => Promise<void>;
};

// Define a type for the AuthProvider props
type AuthProviderProps = {
  children: ReactNode;
};

// Creating the context with an initial "empty" state. This will be overridden by AuthProvider.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // Optionally, check the user's authentication status on initial load
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        console.log("Checking authentication status...");
        try {
            const response = await fetch('http://localhost:8080/validate', {
                method: 'GET',
                credentials: 'include', // Necessary to include cookies in the request
            });
            const data = await response.json();
            console.log("Validation response:", data); // Check what the backend returns
            // Adjust the condition to check the nested user data
            if (response.ok && data.message && data.message.ID) {
                console.log("User is logged in.");
                setIsLoggedIn(true);
            } else {
                console.log("User is not logged in.");
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error checking authentication status:", error);
            setIsLoggedIn(false);
        }
    };
    
    const login = () => setIsLoggedIn(true);
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include', // Necessary for handling cookies
            });
            if (response.ok) {
                setIsLoggedIn(false);
            } else {
                console.error('Failed to log out');
                // Handle logout failure as needed
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};
