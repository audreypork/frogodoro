import { useState } from 'react';
import { useStats } from './hooks/useStats';
import { playSparkle } from './lib/sounds';
import { FocusPanel } from './components/FocusPanel';
import { FoodPanel } from './components/FoodPanel';
import { StatsBox } from './components/StatsBox';
import type { FoodKey } from './lib/types';

function App() {
  const { stats, incrementFood } = useStats();
  const [awaitingSelection, setAwaitingSelection] = useState(false);

  const handleSessionComplete = () => {
    playSparkle();
    setAwaitingSelection(true);
  };

  const handleFoodSelect = (food: FoodKey) => {
    incrementFood(food);
    setAwaitingSelection(false);
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-[#f9cec8]">

      {/* Side-by-side layout (md+) */}
      <div className="hidden md:flex items-center justify-center h-full px-16 xl:px-24">
        <div className="flex items-start gap-5 xl:gap-[30px] w-full xl:w-auto">
          <FocusPanel onSessionComplete={handleSessionComplete} awaitingSelection={awaitingSelection} onFoodDrop={handleFoodSelect} />
          <FoodPanel stats={stats} awaitingSelection={awaitingSelection} onSelectFood={handleFoodSelect} />
        </div>
      </div>

      {/* Mobile layout (below md) */}
      <div className="flex md:hidden flex-col h-full px-3 py-6 gap-3">

        <StatsBox stats={stats} />
        {!awaitingSelection ? (
          <FocusPanel
            onSessionComplete={handleSessionComplete}
            awaitingSelection={false}
            onFoodDrop={handleFoodSelect}
            mobile
          />
        ) : (
          <>
            <FocusPanel
              onSessionComplete={handleSessionComplete}
              awaitingSelection={true}
              onFoodDrop={handleFoodSelect}
              mobile
              frogOnly
            />
            <FoodPanel
              stats={stats}
              awaitingSelection={true}
              onSelectFood={handleFoodSelect}
              mobile
            />
          </>
        )}
      </div>

    </div>
  );
}

export default App;
