import Counter from "./components/Counter";
import RandomNumberGenerater from "./components/RandomNumberGenerater";

const App = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 100,

      }}>
        <Counter />
        <RandomNumberGenerater />
      </div>
  );
};

export default App;