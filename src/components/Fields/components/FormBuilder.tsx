import { Grid } from '@mui/material';
import { FC } from 'react';

import MultipleFreeSolo from './MultipleFreeSolo';
import CurrencyTextField from './CurrencyTextField';
import CustomAutoComplete from './CustomAutoComplete';
import CustomSwitch from './CustomSwitch';
import CustomTextarea from './CustomTextarea';
import ServerSideCustomAutoComplete from './ServerSideCustomAutoComplete';
import CustomRadioButtons from './CustomRadioButtons';
import { Labels } from '../types';
import CustomCheckbox from './CustomCheckbox';
import CustomTextField from './CustomTextField';
import CustomDatePicker from './CustomDatePicker';
import CustomSelect from './CustomSelect';
export interface FormBuilderProps {
  fields: Labels<string>;
}
const FormBuilder: FC<FormBuilderProps> = ({ fields }) => {
  return (
    <>
      {Object.keys(fields)?.map((key) => {
        const { ui, ...common } = fields[key];

        switch (common.type) {
          case 'Custom':
            return (
              <Grid key={key} {...ui?.grid}>
                {common.component}
              </Grid>
            );

          case 'RadioButtons':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomRadioButtons {...common} />
              </Grid>
            );
          case 'Switch':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomSwitch {...common} />
              </Grid>
            );

          case 'Checkbox':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomCheckbox {...common} />
              </Grid>
            );

          case 'String':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomTextField
                  size="small"
                  fullWidth
                  {...common}
                  {...common?.props}
                />
              </Grid>
            );
          case 'Textarea':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomTextarea
                  {...common?.props}
                  size="small"
                  fullWidth
                  {...common}
                />
              </Grid>
            );
          case 'Number':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomTextField
                  type="number"
                  size="small"
                  fullWidth
                  {...common?.props}
                  {...common}
                />
              </Grid>
            );
          case 'Currency':
            return (
              <Grid key={key} {...ui?.grid}>
                <CurrencyTextField fullWidth {...common} />
              </Grid>
            );
          case 'Date':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomDatePicker
                  fullWidth
                  {...common}
                  variant="outlined"
                  enableAccessibleFieldDOMStructure
                  formatDensity="dense"
                  selectedSections={null}
                />
              </Grid>
            );
          case 'Selective':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomSelect size="small" fullWidth {...common} />
              </Grid>
            );
          case 'ServerSideSelective':
            return (
              <Grid key={key} {...ui?.grid}>
                <ServerSideCustomAutoComplete
                  fullWidth
                  size="small"
                  disabledOnChange
                  {...common}
                  {...common.props}
                />
              </Grid>
            );
          case 'FreeSoloSelective':
            return (
              <Grid key={key} {...ui?.grid}>
                <MultipleFreeSolo size="small" {...common} {...common.props} />
              </Grid>
            );
          case 'SearchableSelective':
            return (
              <Grid key={key} {...ui?.grid}>
                <CustomAutoComplete fullWidth size="small" {...common} />
              </Grid>
            );

          default:
            break;
        }
      })}
    </>
  );
};

export default FormBuilder;
