import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
}

export interface BaseComponentProps extends BaseProps {
  [key: string]: any;
}
