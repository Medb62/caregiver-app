import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

// Define the state object type
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  setAuthState: (authState: { token: string | null; refreshToken: string | null }) => void;
}

// Custom hook to manage asynchronous state
function useAsyncState<T>(initialValue: T | null): { value: T | null; loading: boolean; setValue: (value: T | null) => void } {
  const [value, setValue] = React.useState<T | null>(initialValue);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(false); // Mark loading as false once the component mounts
  }, []);

  return {
    value,
    loading,
    setValue,
  };
}

// Function to set storage item asynchronously
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

// Custom hook to manage authentication state (token and refreshToken)
export function useAuthState(): AuthState {
  // Internal state management for token and refreshToken
  const { value: token, loading: tokenLoading, setValue: setToken } = useAsyncState<string | null>(null);
  const { value: refreshToken, loading: refreshTokenLoading, setValue: setRefreshToken } = useAsyncState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(tokenLoading || refreshTokenLoading); // Combine loading states of token and refreshToken
  }, [tokenLoading, refreshTokenLoading]);
  // Fetch the token and refreshToken from storage
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setToken(localStorage.getItem('token'));
          setRefreshToken(localStorage.getItem('refreshToken'));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync('token').then(tokenValue => {
        setToken(tokenValue);
      });
      SecureStore.getItemAsync('refreshToken').then(refreshTokenValue => {
        setRefreshToken(refreshTokenValue);
      });
    }
  }, []);

  // Set the token and refreshToken to storage
  const setAuthState = React.useCallback(
    ({ token, refreshToken }: { token: string | null; refreshToken: string | null }) => {
      setToken(token);
      setRefreshToken(refreshToken);
      setStorageItemAsync('token', token);
      setStorageItemAsync('refreshToken', refreshToken);
    },
    []
  );

  // Return the authentication state object
  return {
    token,
    refreshToken,
    loading,
    setAuthState,
  };
};