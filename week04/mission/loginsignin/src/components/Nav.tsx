import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="bg-gray-900 flex items-center justify-between p-2">
      <Link 
        to="/"
        className="text-pink-500 text-xl"
      >홈</Link>
      <div className="flex items-center gap-5">
        <Link 
          to="/login"
          className="text-white"
        >로그인</Link>
        <Link 
          to="/signup"
          className="text-white bg-pink-500 p-2 rounded-md"
        >회원가입</Link>
      </div>
    </nav>
  )
}

export default Nav
