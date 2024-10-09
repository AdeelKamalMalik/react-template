import React from 'react';
import { styled } from '@mui/system';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';

import { FormFieldControllerProps } from '../types';

const StyledFormControl = styled(FormControl)({
  marginBottom: '16px',
  width: '100%',
});

const FormFieldController: React.FC<FormFieldControllerProps> = ({ name, placeholder, type }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];

  return (
    <StyledFormControl variant="outlined" error={isError}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            multiline={type === 'textarea'}
            minRows={type === 'textarea' ? 3 : 1}
            maxRows={type === 'textarea' ? 5 : undefined}
            error={isError}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      {isError && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
    </StyledFormControl>
  );
};

export default FormFieldController;
