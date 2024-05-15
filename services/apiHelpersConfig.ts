import axios from 'axios';
// import apiClient from '@/services/api';
import { APIErrorResponse } from './types';
import { LoginResponse } from './auth/types';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export function constructError(
  error: unknown,
  fn: (code: string | undefined, type: string | undefined) => Error,
  actionType?: string | undefined
): Error {
  if (axios.isAxiosError(error)) {
    const err = error as APIErrorResponse;
    fn(err.response?.data.errorCode, actionType);
  }
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw error;
}

export async function refreshAccessToken(): Promise<LoginResponse> {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (!refreshToken) {
      throw new Error('no refresh token found');
    }

    const response = await axios.post<LoginResponse>(
      'auth/caregivers/refresh-token',
      {
        refreshToken,
      }
    );
    return response.data;
  } catch (error) {
    //  delete token and refreshToken from secureStore:
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refreshToken');
    router.replace('/sign-in');
    throw error;
  }
}
