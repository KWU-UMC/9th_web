import { useEffect, useState } from "react";

export default function UseEffectPage():Element {
    const [count, setCount] = useState(0);
  
    const handleIncrease = () : void =>{
        setCount((prev): number => prev + 1);
        console.log(count);
    }

    useEffect(() : void => {
        console.log(count)
    }, [count]);

    return (
    <div>
      <h3>UseEffectPage</h3>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>증가</button>
    </div>
  );
}
