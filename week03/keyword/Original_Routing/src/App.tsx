import { Routes, Route, Link } from "./router"

const NaruPage = () => <h1>나루 페이지</h1>
const YuJinPage = () => <h1>유진 페이지</h1>
const NotFoundPage = () => <h1>404</h1>

const Header = () => {
  return (
    <nav>
      <Link to="/naru">naru </Link>
      <Link to="/yujin">yujin </Link>
      <Link to="/not_found">404</Link>
    </nav>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/naru" component={NaruPage}/>
        <Route path="/yujin" component={YuJinPage}/>
        <Route path="/not_found" component={NotFoundPage}/>
      </Routes>
    </div>
  )
}

export default App