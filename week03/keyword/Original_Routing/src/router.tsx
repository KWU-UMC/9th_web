import {
  Children,
  isValidElement,
  cloneElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FC, ReactElement } from "react";

const getPath = () => window.location.pathname;

export function navigateTo(to: string) {
  if (getPath() === to) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("pushstate"));
}

export function useCurrentPath() {
  const [path, setPath] = useState(getPath);
  useEffect(() => {
    const onChange = () => setPath(getPath);
    window.addEventListener("popstate", onChange);
    window.addEventListener("pushstate", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("pushstate", onChange);
    };
  }, []);
  return path;
}

export const Link: FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      e.metaKey || // Cmd (Mac)
      e.ctrlKey || // Ctrl (Windows)
      e.shiftKey || // Shift
      e.altKey || // Alt
      e.button !== 0 // 왼쪽 클릭이 아닐 때 (ex. 휠 클릭)
    ) {
      return;
    }
    e.preventDefault();
    navigateTo(to);
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export type RouteProps = {
  path: string;
  component: React.ComponentType;
};

export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};

export const Routes: FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(
      isValidElement
    ) as ReactElement<RouteProps>[];
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement<RouteProps>(activeRoute);
};
