import "./App.css";
import HeadBar from "./components/Headbar";
import Footer from "./components/Footer";
import MusicList from "./components/MusicList";

const App = () => {
  return (
    <div>
      <HeadBar />
      <MusicList />
      <Footer />
    </div>
  );
};

export default App;
