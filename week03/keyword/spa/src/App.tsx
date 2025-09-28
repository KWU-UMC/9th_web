import { Routes, Route, Link } from "./router"

const tenPage = () => <h1>텐 페이지</h1>
const wonPage = () => <h1>원 페이지</h1>
const youngPage = () => <h1>영 페이지</h1>
const NotFoundPage = () => <h1>404</h1>

const Header = () => {
  return (
    <nav>
      <Link to="/ten">TEN </Link>
      <Link to="/won">WON </Link>
      <Link to="/young">YOUNG </Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/ten" component={tenPage}/>
        <Route path="/won" component={wonPage}/>
        <Route path="/young" component={youngPage}/>
        <Route path="/not-found" component={NotFoundPage}/>
      </Routes>
    </div>
  )
}

export default App
