import type { FC } from 'react';

interface RouteProps {
  path: string;
  component: FC;
}

export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};