'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { User } from '@/types';

type LoginPayload = { email: string; password: string };
type LoginResponse = { accessToken: string; user: User };

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<LoginResponse>('/auth/login', payload);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('cohortflow_token', data.accessToken);
      localStorage.setItem('cohortflow_user', JSON.stringify(data.user));
      toast.success('Welcome back to CohortFlow AI', {
        description: `Logged in as ${data.user.role.toLowerCase()}`,
      });
    },
    onError: () => toast.error('Login failed', { description: 'Please check your email and password.' }),
  });
}
