import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Satellite, AddSatelliteData } from '../../../types/satellite';
import { satelliteService } from '../../../services/satelliteService';

export function useSatellites() {
  const queryClient = useQueryClient();

  const {
    data: satellites = [],
    isLoading,
    error,
  } = useQuery<Satellite[]>({
    queryKey: ['satellites'],
    queryFn: satelliteService.getAll,
  });

  const addMutation = useMutation({
    mutationFn: satelliteService.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['satellites'] }),
  });

  const removeMutation = useMutation({
    mutationFn: satelliteService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['satellites'] }),
  });

  const addSatellite = useCallback(
    (data: AddSatelliteData) => {
      addMutation.mutate(data);
    },
    [addMutation],
  );

  const removeSatellite = useCallback(
    (id: string) => {
      removeMutation.mutate(id);
    },
    [removeMutation],
  );

  return {
    satellites,
    isLoading,
    error,
    addSatellite,
    removeSatellite,
  };
}
