import React, { ComponentType } from 'react';
import { WithAuthProps } from '../types';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P & WithAuthProps> => {
  return ({ isAuthenticated, ...props }: WithAuthProps & P) => {
    if (!isAuthenticated) {
      return <div>You must be logged in to view this page.</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };
};

export default withAuth;
