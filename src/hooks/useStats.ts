import { useState, useEffect } from 'react';
import { fetchStats, incrementFood as incrementFoodApi } from '../lib/supabase-api';
import type { FrogStats, FoodKey } from '../lib/types';

const DEFAULT_STATS: FrogStats = {
  sessions: 0,
  taro_croissant: 0,
  basque_cheesecake: 0,
  black_card: 0,
  airwrap: 0,
  tesla: 0,
  lafufu: 0,
  hong_pao: 0,
  ice_matcha_latte: 0,
  chanel_bag: 0,
  coffee: 0,
  dumplings: 0,
  airpods: 0,
  van_cleef: 0,
  banana_milk: 0,
  boba: 0,
  ramen: 0,
  apple: 0,
  onigiri: 0,
  matcha_soft_serve: 0,
  tamagotchi: 0,
  gameboy: 0,
};

interface UseStatsReturn {
  stats: FrogStats;
  incrementFood: (food: FoodKey) => void;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<FrogStats>(DEFAULT_STATS);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((err) => console.error('Failed to load stats:', err));
  }, []);

  const incrementFood = (food: FoodKey) => {
    // Optimistic local update
    setStats(prev => ({ ...prev, [food]: prev[food] + 1, sessions: prev.sessions + 1 }));
    // DB write goes through the increment_food function — no direct UPDATE allowed
    incrementFoodApi(food).catch((err) => console.error('Failed to save stats:', err));
  };

  return { stats, incrementFood };
}
