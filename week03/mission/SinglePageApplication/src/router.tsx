import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactElement,
  type ReactNode,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
} from "react";

const getPath = () => window.location.pathname;

export function navigate(to: string) {
  if (getPath() === to) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("pushstate"));
}

function usePathname() {
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

export const Link: FC<{ to: string; children: ReactNode }> = ({ to, children }) => {
  const onClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
};

export type RouteProps = {
  path: string;
  component: ComponentType;
};

export const Route: FC<RouteProps> = () => null;

export const Routes: FC<{
  children: ReactElement<RouteProps> | ReactElement<RouteProps>[];
  notFound?: ReactNode;
}> = ({ children, notFound }) => {
  const path = usePathname();

  const active = useMemo(() => {
    const list = Children.toArray(children).filter(isValidElement) as ReactElement<RouteProps>[];
    return list.find((el) => el.props.path === path) ?? null;
  }, [children, path]);

  if (!active) return <>{notFound ?? null}</>;

  const Comp = active.props.component;
  return <Comp />;
};
