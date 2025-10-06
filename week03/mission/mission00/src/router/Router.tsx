import { type FC, Children, cloneElement, useMemo } from 'react';
import { useCurrentPath } from '../hooks/useCurrentPath';

export const Routes: FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(
      (child: any) => child.type?.name === 'Route'
    );
    return routes.find((route: any) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute as any);
};