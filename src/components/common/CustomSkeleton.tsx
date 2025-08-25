import { Skeleton, SkeletonProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface CustomSkeletonProps extends SkeletonProps {
  isLoading?: boolean;
}
const CustomSkeleton: FC<PropsWithChildren<CustomSkeletonProps>> = ({
  children,
  isLoading,
  ...props
}) => {
  if (!isLoading) {
    return children;
  }
  return (
    <Skeleton variant="rectangular" width="100%" {...props}>
      {children}
    </Skeleton>
  );
};

export default CustomSkeleton;
