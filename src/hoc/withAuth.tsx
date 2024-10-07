import React, { ComponentType } from 'react';

import { WithAuthProps } from '../types';
import { YOU_MUST_BE_AUTHENTICATED } from '../constants';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P & WithAuthProps> => {
  return ({ isAuthenticated, ...props }: WithAuthProps & P) => {
    if (!isAuthenticated) {
      return <div>{YOU_MUST_BE_AUTHENTICATED}</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };
};

export default withAuth;
