import { supabase } from './supabase';
import type { FrogStats } from './types';

const COLUMNS = 'sessions,taro_croissant,basque_cheesecake,black_card,airwrap,tesla,lafufu,hong_pao,ice_matcha_latte,chanel_bag,coffee,dumplings,airpods,van_cleef,banana_milk,boba,ramen,apple,onigiri,matcha_soft_serve,tamagotchi,gameboy';

export async function fetchStats(): Promise<FrogStats> {
  const { data, error } = await supabase
    .from('frog_stats')
    .select(COLUMNS)
    .eq('id', 1)
    .single();
  if (error) throw error;
  const row = data as FrogStats;
  return {
    sessions: row.sessions,
    taro_croissant: row.taro_croissant,
    basque_cheesecake: row.basque_cheesecake,
    black_card: row.black_card,
    airwrap: row.airwrap,
    tesla: row.tesla,
    lafufu: row.lafufu,
    hong_pao: row.hong_pao,
    ice_matcha_latte: row.ice_matcha_latte,
    chanel_bag: row.chanel_bag,
    coffee: row.coffee,
    dumplings: row.dumplings,
    airpods: row.airpods,
    van_cleef: row.van_cleef,
    banana_milk: row.banana_milk,
    boba: row.boba,
    ramen: row.ramen,
    apple: row.apple,
    onigiri: row.onigiri,
    matcha_soft_serve: row.matcha_soft_serve,
    tamagotchi: row.tamagotchi,
    gameboy: row.gameboy,
  };
}

export async function incrementFood(foodKey: string): Promise<void> {
  const { error } = await supabase.rpc('increment_food', { food_key: foodKey });
  if (error) throw error;
}
