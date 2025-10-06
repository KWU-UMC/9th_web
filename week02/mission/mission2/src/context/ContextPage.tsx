import { ThemeProvider } from './ThemeProvider';
import Navbar from './Navbar';
import ThemeContent from './ThemeContent';

function ContextPage() {
  return (
    // ThemeProvider로 하위 컴포넌트들을 감싸면
    // 이 안의 모든 컴포넌트들이 useTheme() 훅을 통해 상태에 접근할 수 있습니다.
    <ThemeProvider>
      <PageLayout />
    </ThemeProvider>
  );
}

// 전체 레이아웃을 담당하는 컴포넌트
function PageLayout() {
  return (
    <div>
      <Navbar />
      <ThemeContent />
    </div>
  );
}

export default ContextPage;