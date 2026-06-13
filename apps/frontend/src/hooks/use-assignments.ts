'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { Assignment } from '@/types';

export function useAssignments() {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const { data } = await api.get<Assignment[]>('/assignments');
      return data;
    },
  });
}

export function useSubmitAssignment(setProgress: (value: number) => void) {
  return useMutation({
    mutationFn: async (payload: { assignmentId: string; answerText: string; file?: File | null }) => {
      const formData = new FormData();
      formData.append('assignmentId', payload.assignmentId);
      formData.append('answerText', payload.answerText);
      if (payload.file) formData.append('file', payload.file);

      const { data } = await api.post('/submissions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          const total = event.total || 1;
          setProgress(Math.round((event.loaded * 100) / total));
        },
      });
      return data;
    },
    onSuccess: () => {
      setProgress(100);
      toast.success('Assignment submitted', { description: 'Your mentor can now review your work.' });
    },
    onError: () => toast.error('Upload failed', { description: 'Please try again.' }),
  });
}
