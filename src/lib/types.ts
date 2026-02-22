export type FoodKey =
  | 'taro_croissant'
  | 'basque_cheesecake'
  | 'black_card'
  | 'airwrap'
  | 'tesla'
  | 'lafufu'
  | 'hong_pao'
  | 'ice_matcha_latte'
  | 'chanel_bag'
  | 'coffee'
  | 'dumplings'
  | 'airpods'
  | 'van_cleef'
  | 'banana_milk'
  | 'boba'
  | 'ramen'
  | 'apple'
  | 'onigiri'
  | 'matcha_soft_serve'
  | 'tamagotchi'
  | 'gameboy';

export interface FrogStats {
  sessions: number;
  taro_croissant: number;
  basque_cheesecake: number;
  black_card: number;
  airwrap: number;
  tesla: number;
  lafufu: number;
  hong_pao: number;
  ice_matcha_latte: number;
  chanel_bag: number;
  coffee: number;
  dumplings: number;
  airpods: number;
  van_cleef: number;
  banana_milk: number;
  boba: number;
  ramen: number;
  apple: number;
  onigiri: number;
  matcha_soft_serve: number;
  tamagotchi: number;
  gameboy: number;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'complete';
