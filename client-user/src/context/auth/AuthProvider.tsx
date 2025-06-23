import React, { useEffect, useState } from "react";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored user data
        const storedUser = localStorage.getItem('bankUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful login
        const mockUser: User = {
            id: '1',
            email,
            name: 'John Doe',
            isVerified: true,
            kycStatus: 'verified',
            balance: 15420.50
        };

        setUser(mockUser);
        localStorage.setItem('bankUser', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
    };

    const register = async (userData: any): Promise<boolean> => {
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock successful registration
        const newUser: User = {
            id: '1',
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            isVerified: false,
            kycStatus: 'pending',
            balance: 0
        };

        setUser(newUser);
        localStorage.setItem('bankUser', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bankUser');
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('bankUser', JSON.stringify(updatedUser));
        }
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        updateUser,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};