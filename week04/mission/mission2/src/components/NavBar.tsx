import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="bg-white">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 ">
          WEEK4 LOGIN
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            로그인
          </Link>

          <button
            className="bg-transparent text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;