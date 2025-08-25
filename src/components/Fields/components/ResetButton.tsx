import { Button, ButtonProps } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ResetButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { reset } = useFormContext();

  const confirm = useConfirm();

  // const onClick = () => {
  //   confirm().then(() => {
  //     reset({});
  //     props?.onClick?.(null);
  //   });
  // };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirm().then(() => {
      reset({});
      props?.onClick?.(event);
    });
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ResetButton;
