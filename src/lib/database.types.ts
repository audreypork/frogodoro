interface FrogStatsRow {
  id: number;
  sessions: number;
  gameboy: number;
  soft_serve: number;
  onigiri: number;
  tamagotchi: number;
  noodles: number;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      frog_stats: {
        Row: FrogStatsRow;
        Update: Partial<Omit<FrogStatsRow, 'id'>>;
        Insert: { id?: number };
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
