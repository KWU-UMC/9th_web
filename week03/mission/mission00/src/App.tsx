import { Routes } from './router/Router'
import { Route } from './router/Route';
import { Link } from './Link';

const DetailPage = () => <h1>Detail</h1>;
const HomePage = () => <h1>Home</h1>;
const DoyunPage = () => <h1>Do yun</h1>;
const NotFoundPage = () => <h1>Not Found</h1>;

const Header = () => (
  <nav style={{ display: 'flex', gap: '10px' }}>
    <Link to="/">HOME</Link>
    <Link to="/detail">DETAIL</Link>
    <Link to="/doyun">DOYUN</Link>
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
        <Route path="/doyun" component={DoyunPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;