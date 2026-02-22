import { useState } from 'react';
import { useStats } from './hooks/useStats';
import { FocusPanel } from './components/FocusPanel';
import { FoodPanel } from './components/FoodPanel';
import { StatsBox } from './components/StatsBox';
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
    <div className="h-screen w-full overflow-hidden bg-[#f9cec8]">

      {/* Desktop layout */}
      <div className="hidden lg:flex items-center justify-center h-full">
        <div className="flex items-start gap-[30px]">
          <FocusPanel onSessionComplete={handleSessionComplete} awaitingSelection={awaitingSelection} />
          <FoodPanel stats={stats} awaitingSelection={awaitingSelection} onSelectFood={handleFoodSelect} />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex lg:hidden flex-col h-full p-3 gap-3">
        <StatsBox stats={stats} />
        {!awaitingSelection ? (
          <FocusPanel
            onSessionComplete={handleSessionComplete}
            awaitingSelection={false}
            mobile
          />
        ) : (
          <FoodPanel
            stats={stats}
            awaitingSelection={awaitingSelection}
            onSelectFood={handleFoodSelect}
            mobile
          />
        )}
      </div>

    </div>
  );
}

export default App;
