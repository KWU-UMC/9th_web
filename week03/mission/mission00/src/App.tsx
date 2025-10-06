import { Routes } from './router/Router'
import { Route } from './router/Route';
import { Link } from './Link';

const DetailPage = () => <h1>세부 페이지</h1>;
const HomePage = () => <h1>홈 페이지</h1>;
const HagyeongPage = () => <h1>하갱 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => (
  <nav style={{ display: 'flex', gap: '10px' }}>
    <Link to="/">HOME</Link>
    <Link to="/detail">DETAIL</Link>
    <Link to="/hagyeong">HAGYEONG</Link>
    <Link to="/not-found">NOT FOUND</Link>
  </nav>
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" component={HomePage} />
        <Route path="/detail" component={DetailPage} />
        <Route path="/hagyeong" component={HagyeongPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
