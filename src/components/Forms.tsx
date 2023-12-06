import React, {useState, FC} from 'react';
import styled from 'styled-components/native';
import {FONTS, SIZES} from '../constants/colors';
import {Caption, Text} from './Texts';
import ShowPassword from '../../assets/icons_svg/show_password';
import HidePassword from '../../assets/icons_svg/hide_password';
import {TouchableOpacity} from 'react-native';

type CuInputProps = {
  disabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
  last?: boolean;
  onChange?: any;
  value: any;
  style?: any;
  marginBottom?: any;
  label?: string;
  errorLabel?: string;
  placeholder?: string;
  hidePasswordIcon?: boolean;
  multiline?: boolean;
  numberOfLines?: any;
  children?: any;
  width?: string;
  keyboardType?: string;
  hasLimit?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
};

export const CustomInput: FC<CuInputProps> = ({
  disabled = false,
  isLoading = false,
  error = false,
  last = false,
  errorLabel,
  multiline = false,
  onChange,
  value,
  style,
  marginBottom,
  label,
  placeholder,
  hidePasswordIcon = false,
  numberOfLines = 1,
  width = '100',
  keyboardType,
  hasLimit = false,
  secureTextEntry,
  maxLength,
}) => {
  const [focus, onFocus] = useState(false);
  const [dinamicMaxLength, setDinamicMaxLength] = useState(2);
  const [hidePassword, setHidePassword] = useState(true);

  const changeSecureIconEntry = () => {
    if (!hidePassword) {
      setHidePassword(true);
    } else {
      setHidePassword(false);
    }
  };

  const handleChange = (inputValue: any) => {
    if (inputValue === '10' || inputValue === '100') {
      // console.log(inputValue, typeof inputValue);
      setDinamicMaxLength(3);
      onChange(inputValue);
    } else {
      setDinamicMaxLength(2);
      onChange(inputValue);
    }
  };
  return (
    <FormGroup marginBottom={marginBottom} last={last} width={width}>
      <LabelInput style={{...FONTS.h4}}>{label}</LabelInput>

      {hasLimit ? (
        <Input
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={{...style}}
          editable={isLoading ? false : disabled ? false : true}
          isFocus={focus}
          autoCapitalize="none"
          onFocus={() => {
            onFocus(true);
          }}
          onBlur={() => onFocus(false)}
          error={error}
          onChangeText={hasLimit ? handleChange : onChange}
          maxLength={maxLength || dinamicMaxLength}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder ? placeholder : label}
        />
      ) : (
        <InputIconView>
          <Input
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={{...style}}
            editable={isLoading ? false : disabled ? false : true}
            isFocus={focus}
            autoCapitalize="none"
            onFocus={() => {
              onFocus(true);
            }}
            onBlur={() => onFocus(false)}
            error={error}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hidePasswordIcon ? hidePassword : secureTextEntry}
            placeholder={placeholder ? placeholder : label}
          />
          {hidePasswordIcon && (
            <TouchableOpacity
              onPress={changeSecureIconEntry}
              style={{position: 'absolute', right: SIZES.radius}}>
              {hidePassword ? <ShowPassword /> : <HidePassword />}
            </TouchableOpacity>
          )}
        </InputIconView>
      )}
      {error && <Caption style={{color: 'red'}}>{errorLabel}</Caption>}
    </FormGroup>
  );
};

export type InputContainerProps = {
  marginBottom?: any;
  last?: boolean;
  width?: string;
  theme: any;
};
export const FormGroup = styled.View<InputContainerProps>`
  width: ${(props: InputContainerProps) =>
    props.width ? props.width : '100'}%;
  align-items: flex-start;
  ${(props: InputContainerProps) =>
    props.last
      ? ''
      : props.marginBottom
      ? `margin-bottom: ${props.marginBottom}px;`
      : 'margin-bottom: 16px;'}
`;
export type InputProps = {
  align: 'left' | 'center' | 'right';
  theme: any;
  isFocus?: boolean;
  error?: boolean;
  multiline?: boolean;
  active?: boolean;
};
export const Input = styled.TextInput<InputProps>`
flex-direction: row;
  height: ${(props: InputProps) => (props.multiline ? '150px' : '48px')};
  ${(props: InputProps) => (props.multiline ? 'text-align-vertical: top;' : '')}
  width: 100%;
  justify-content: ${(props: InputProps) =>
    props.multiline ? 'flex-start' : 'center'};
  align-items: flex-start;
  text-align: ${(props: InputProps) => props.align || 'left'};
  font-size: 15px;
  background-color: ${(props: InputProps) =>
    props.error ? props.theme.errorBg : props.theme.inputBG};
  border-width: 1px;
  border-color: ${(props: InputProps) =>
    props.isFocus
      ? props.theme.primary
      : props.error
      ? props.theme.errorBor
      : props.theme.inputBor}
  padding: 13.5px 10px 13.5px 16px;
  border-radius: 16px;
`;
export const InputIconView = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const LabelInput = styled(Text)`
  font-weight: 500;
  text-align: left;
  text-transform: none;
  margin-bottom: 4px;
`;
