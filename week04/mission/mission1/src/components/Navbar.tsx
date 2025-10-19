import CustomLink from "./CustomLink";
const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4">
      <CustomLink url="/" text="홈" />
      <CustomLink url="/movies/popular" text="인기 영화" />
      <CustomLink url="/movies/showing" text="상영 중" />
      <CustomLink url="/movies/rated" text="평점 높은" />
      <CustomLink url="/movies/coming" text="개봉 예정" />
    </nav>
  );
};

export default Navbar;
