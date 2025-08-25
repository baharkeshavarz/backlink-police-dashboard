import { Switch, SwitchProps } from '@mui/material';
import { FC, useEffect, useState } from 'react';

export interface RollbackSwitchProps
  extends Omit<SwitchProps, 'value' | 'checked'> {
  value: boolean;
}

const RollbackSwitch: FC<RollbackSwitchProps> = ({
  value,
  // onChange,
  ...props
}) => {
  const [checked, setChecked] = useState(value);
  useEffect(() => {
    setChecked(value);
  }, [value]);

  const _onChange: SwitchProps['onChange'] = async (_event, checked) => {
    try {
      setChecked(checked);
      //await onChange(_event, checked); //TODO
    } catch (error) {
      console.log(error);
      setChecked(value);
    }
  };

  return <Switch checked={checked} {...props} onChange={_onChange} />;
};

export default RollbackSwitch;
