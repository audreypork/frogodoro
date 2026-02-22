import { useState } from 'react';
import { useStats } from './hooks/useStats';
import { FocusPanel } from './components/FocusPanel';
import { FoodPanel } from './components/FoodPanel';
import type { FoodKey } from './lib/types';

function App() {
  const { stats, incrementFood } = useStats();
  const [awaitingSelection, setAwaitingSelection] = useState(false);

  const handleSessionComplete = () => {
    setAwaitingSelection(true);
  };

  const handleFoodSelect = (food: FoodKey) => {
    incrementFood(food);
    setAwaitingSelection(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#f9cec8] flex items-center justify-center">
      <div className="flex items-start gap-[30px]">
        <FocusPanel onSessionComplete={handleSessionComplete} />
        <FoodPanel stats={stats} awaitingSelection={awaitingSelection} onSelectFood={handleFoodSelect} />
      </div>
    </div>
  );
}

export default App;
