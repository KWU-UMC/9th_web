import { Routes, Route, Link } from "./router"

const ShinPage = () => <h1>신 페이지</h1>
const HyunPage = () => <h1>현 페이지</h1>
const WooPage = () => <h1>우 페이지</h1>
const NotFoundPage = () => <h1>404</h1>

const Header = () => {
  return (
    <nav>
      <Link to="/Shin">SHIN </Link>
      <Link to="/Hyun">HYUN </Link>
      <Link to="/Woo">WOO </Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/Shin" component={ShinPage}/>
        <Route path="/Hyun" component={HyunPage}/>
        <Route path="/Woo" component={WooPage}/>
        <Route path="/not-found" component={NotFoundPage}/>
      </Routes>
    </div>
  )
}

export default App