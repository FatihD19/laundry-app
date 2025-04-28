// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@LaundryApp:token';
const USERNAME_KEY = '@LaundryApp:username';
const PASSWORD_KEY = '@LaundryApp:password';

export const storeToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

export const getStoredToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const storeCredentials = async (username: string, password: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(USERNAME_KEY, username);
        await AsyncStorage.setItem(PASSWORD_KEY, password);
    } catch (error) {
        console.error('Error storing credentials:', error);
    }
};

export const getStoredCredentials = async (): Promise<{ username: string | null; password: string | null }> => {
    try {
        const username = await AsyncStorage.getItem(USERNAME_KEY);
        const password = await AsyncStorage.getItem(PASSWORD_KEY);
        return { username, password };
    } catch (error) {
        console.error('Error getting credentials:', error);
        return { username: null, password: null };
    }
};

export const clearStorage = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([TOKEN_KEY, USERNAME_KEY, PASSWORD_KEY]);
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
};