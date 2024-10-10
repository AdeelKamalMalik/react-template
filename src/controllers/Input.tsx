import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField,
  FormControl,
  FormHelperText,
  Autocomplete,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormFieldControllerProps } from '../types';

const StyledFormControl = styled(FormControl)({
  marginBottom: '16px',
  width: '100%',
});

const FormFieldController: React.FC<FormFieldControllerProps> = ({
  name,
  placeholder,
  isPassword,
  type = 'text',
  options = [],
  freeSolo = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isError = !!errors[name];
  
  // Local state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <StyledFormControl variant="outlined" error={isError}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === 'autocomplete') {
            return (
              <Autocomplete
                {...field}
                multiple
                freeSolo={freeSolo}
                options={options}
                value={field.value || []}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    variant="outlined"
                    error={isError}
                  />
                )}
              />
            );
          }

          return (
            <TextField
              {...field}
              type={isPassword && !showPassword ? 'password' : type}
              placeholder={placeholder}
              variant="outlined"
              fullWidth
              multiline={type === 'textarea'}
              minRows={type === 'textarea' ? 3 : 1}
              maxRows={type === 'textarea' ? 5 : undefined}
              error={isError}
              InputProps={
                isPassword
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : undefined
              }
            />
          );
        }}
      />

      {isError && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
    </StyledFormControl>
  );
};

export default FormFieldController;
