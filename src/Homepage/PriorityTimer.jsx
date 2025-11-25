import React, { useEffect, useState } from 'react';

const PriorityTimer = () => {

  const [counterSec, setCounterSec] = useState(5);
  const [counterMin, setCounterMin] = useState(10);

  useEffect(() => {
    if (counterSec > 0) {
      const timer = setTimeout(() => setCounterSec(counterSec - 1), 1000);
      return () => (clearTimeout(timer));
    }    
  }, [counterSec]);

useEffect(()=>{
if(counterMin > 0 && counterSec == 0 ){
      const timerMin =  setTimeout(() => setCounterMin(counterMin - 1), 1000);
      return () => (clearTimeout(timerMin));
    }
},[counterSec > 0])


return (
        <div>
{/* For TSX uncomment the commented types below */}
<span className="countdown mx-2">
  <span style={{"--value": counterMin} /* as React.CSSProperties */ } aria-live="polite" aria-label={`${counterMin}`}>59</span>
</span>

<span className="countdown mx-2">
  <span style={{"--value": counterSec} /* as React.CSSProperties */ } aria-live="polite" aria-label={`${counterSec}`}>59</span>
</span>

</div>



    );
};

export default PriorityTimer;