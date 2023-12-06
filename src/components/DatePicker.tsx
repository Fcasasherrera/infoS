import React, {useState, FC, useEffect} from 'react';
import styled from 'styled-components/native';
import {FormGroup, InputProps, LabelInput} from './Forms';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {LabelButton} from './CustomSelect';

type DatePickerProps = {
  disabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
  onChange: any;
  value: string;
  style?: any;
  label?: string;
  placeholder?: string;
  marginBottom?: string;
  width?: string;
  containerStyle?: any;
  minimumDate?: string;
  mode?: 'date' | 'time' | 'datetime' | undefined;
};

export const DatePicker: FC<DatePickerProps> = ({
  disabled = false,
  isLoading = false,
  error = false,
  onChange,
  value,
  style,
  label,
  placeholder,
  marginBottom,
  width = '100',
  containerStyle,
  minimumDate = '',
  mode = 'date',
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modelValue, setModelValue] = useState(value);
  useEffect(() => {
    if (mode === 'time') {
      let mo = moment(value, 'HH:mm').format();
      setModelValue(mo);
      return;
    }
    let mo = moment(value).format();
    setModelValue(mo);
    return;
  }, [value]);
  const showDatePicker = (value: boolean) => {
    setDatePickerVisibility(value);
  };

  const handleConfirm = (date: any) => {
    if (mode === 'time') {
      console.log(date);
      const formatDate = moment(date).format('HH:mm');
      console.log(formatDate);
      onChange(formatDate, date);
      showDatePicker(false);
      return;
    }

    const formatDate = moment(new Date(date)).format();
    onChange(formatDate, date.toISOString());
    showDatePicker(false);
  };
  const today = new Date();

  const canExecute = disabled || isLoading ? false : true;

  return (
    <FormGroup
      style={{...containerStyle}}
      width={width}
      marginBottom={marginBottom}>
      <LabelInput>{label}</LabelInput>
      <DateButton
        width={width}
        activeOpacity={disabled ? 1 : isLoading ? 1 : 0.4}
        style={{...style}}
        onPress={
          canExecute
            ? () => {
                showDatePicker(true);
              }
            : () => {}
        }
        error={error}>
        <LabelButton>
          {value ? value : placeholder ? placeholder : label}
        </LabelButton>
      </DateButton>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        date={new Date(modelValue)}
        onConfirm={handleConfirm}
        onCancel={() => showDatePicker(false)}
        minimumDate={minimumDate === '' ? today : new Date(minimumDate)}
      />
    </FormGroup>
  );
};

export const DateButton = styled.TouchableOpacity<InputProps>`
      height:48px;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: ${(props: InputProps) =>
        props.error ? props.theme.errorBg : props.theme.inputBG};
      border-width: 1px;
      border-color: ${(props: InputProps) =>
        props.isFocus
          ? props.theme.primary
          : props.error
          ? props.theme.errorBor
          : props.theme.inputBor}
      padding: 12px 16px;
      border-radius: 16px;
    `;
