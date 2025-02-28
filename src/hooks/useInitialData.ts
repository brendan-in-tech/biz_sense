import { useEffect } from 'react';
import { useBusinessContext } from '../contexts/BusinessContext';
import { businessService } from '../services/businessService';

export function useInitialData() {
  const { dispatch } = useBusinessContext();

  useEffect(() => {
    async function loadInitialData() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const [profile, metrics, marketing, benchmarks, transactions] = await Promise.all([
          businessService.getProfile(),
          businessService.getMetrics(),
          businessService.getMarketingMetrics(),
          businessService.getBenchmarks(),
          businessService.getTransactions(),
        ]);

        dispatch({ type: 'SET_PROFILE', payload: profile });
        dispatch({ type: 'SET_METRICS', payload: metrics });
        dispatch({ type: 'SET_MARKETING', payload: marketing });
        dispatch({ type: 'SET_BENCHMARKS', payload: benchmarks });
        dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to load initial data. Please try again later.',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    loadInitialData();
  }, [dispatch]);
} 