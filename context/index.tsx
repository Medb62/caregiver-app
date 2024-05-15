import React from 'react';
import { useAuthState } from './useStorageState'
import { router } from 'expo-router';
import API from '@/services';
import { ToastComponent } from '@/utils/toastComponent';

const AuthContext = React.createContext<{
  signIn: (values: { email: string; password: string }) => void;
  signOut: () => void;
  token?: string | null;
  refreshToken?: string | null;
  loading: boolean;
  authLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  token: undefined,
  refreshToken: undefined,
  loading: false,
  authLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  // if (process.env.NODE_ENV !== 'production') {
  //   if (!value) {
  //     throw new Error('useSession must be wrapped in a <SessionProvider />');
  //   }
  // }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const { token, refreshToken, loading, setAuthState } = useAuthState();
    const [authLoading, setAuthLoading] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (values) => {
          console.log('user signing in');
          setAuthLoading(true);
          try {
            console.log("this is auth : ", API)
            const response = await API.auth.login(values);
            if (response?.token) {
              setAuthLoading(false);
              const { token, refreshToken } = response;
              console.log("user signed in!");
              // Set the new authentication state after login
              setAuthState({token, refreshToken});
              ToastComponent('Logged in successfully !', 'success');
              router.replace('/');
            }
          } 
          catch (err : any) {
            setAuthLoading(false);
            console.log('this is login error ::: ', err);
            ToastComponent(err?.message, 'error');
          }
        },
        signOut: () => {
          ToastComponent('See you again soon !', 'success');
          setAuthState({token: null, refreshToken: null});
        },
        token,
        refreshToken,
        loading,
        authLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
