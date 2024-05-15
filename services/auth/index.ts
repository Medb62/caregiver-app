import apiClient from '@/services/api';
import { LoginResponse, LoginBody } from './types';
import { constructError } from '../apiHelpersConfig';
import { handleErrors } from './errors';

  async function login(body: LoginBody): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('auth/caregivers/login', body);
      return response.data;
    } catch (error) {
       console.log("ERR : ", error);
       throw constructError(error, handleErrors);
    }
  };

  export default {
    login,
  };