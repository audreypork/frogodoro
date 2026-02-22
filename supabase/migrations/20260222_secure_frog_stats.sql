-- Enable RLS — blocks all direct writes from anon by default
ALTER TABLE frog_stats ENABLE ROW LEVEL SECURITY;

-- Allow anon to read stats (SELECT only)
CREATE POLICY "anon_select" ON frog_stats
  FOR SELECT TO anon USING (true);

-- increment_food: the only sanctioned way to write to frog_stats.
-- SECURITY DEFINER runs as the function owner (postgres), bypassing RLS.
-- food_key is validated against an explicit allowlist before any SQL executes.
CREATE OR REPLACE FUNCTION increment_food(food_key TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF food_key NOT IN (
    'taro_croissant', 'basque_cheesecake', 'black_card', 'airwrap', 'tesla',
    'lafufu', 'hong_pao', 'ice_matcha_latte', 'chanel_bag', 'coffee',
    'dumplings', 'airpods', 'van_cleef', 'banana_milk', 'boba', 'ramen',
    'apple', 'onigiri', 'matcha_soft_serve', 'tamagotchi', 'gameboy'
  ) THEN
    RAISE EXCEPTION 'invalid food_key: %', food_key;
  END IF;

  EXECUTE format(
    'UPDATE frog_stats SET %I = %I + 1, sessions = sessions + 1 WHERE id = 1',
    food_key, food_key
  );
END;
$$;

-- Grant anon the ability to call the function (but nothing else)
GRANT EXECUTE ON FUNCTION increment_food(TEXT) TO anon;
