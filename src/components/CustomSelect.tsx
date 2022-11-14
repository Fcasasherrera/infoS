import React, {useState, FC} from 'react';
import styled from 'styled-components/native';
import {IconButton} from './Button';
import {CustomView, Row} from './Containers';
import {FormGroup, InputProps, LabelInput} from './Forms';
import ModalComponent from './Modal';
import {Text} from './Texts';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CuSelectProps = {
  disabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
  last?: boolean;
  onChange: any;
  value: any;
  style?: any;
  marginBottom?: any;
  label?: string;
  width?: string;
  placeholder?: string;
  numberOfLines?: any;
  children?: any;
  data?: any;
  capitalize?: boolean;
  icon?: any;
};

export const CustomSelect: FC<CuSelectProps> = ({
  disabled = false,
  isLoading = false,
  error = false,
  last = false,
  onChange,
  value,
  style,
  marginBottom,
  label,
  width,
  placeholder,
  children,
  data,
  capitalize = false,
  icon,
}) => {
  const [showModal, onFocus] = useState(false);
  const renderItem = (data: any) => (
    <SelectItem
      onPress={() => {
        onFocus(!showModal);
        onChange(data.item);
      }}>
      <Row fdirection="row">
        {icon && data.item.icon}

        <Text
          style={{
            textTransform: capitalize ? 'capitalize' : 'none',
            marginLeft: icon && 10,
          }}>
          {data.item.title}
        </Text>
      </Row>
    </SelectItem>
  );
  const onExec = () => {
    onFocus(true);
  };
  const canExecute = disabled || isLoading ? false : true;
  return (
    <FormGroup marginBottom={marginBottom} last={last} width={width}>
      {label !== '' && <LabelInput>{label} </LabelInput>}
      <Select
        activeOpacity={disabled ? 1 : isLoading ? 1 : 0.4}
        style={{...style}}
        onPress={canExecute ? onExec : () => {}}
        error={error}>
        <Text
          style={{
            color: '#959AA8',
          }}>
          {value ? value : placeholder ? placeholder : label}
        </Text>

        <Icon name="arrow-down" size={16} color="#2B3F6C" />
      </Select>

      <ModalComponent
        alert
        hasList
        visible={showModal}
        onBack={() => {
          onFocus(!showModal);
        }}>
        <Row fdirection="row" align="center" justify="space-between">
          <Text>{placeholder ? placeholder : label}</Text>
          <IconButton
            onPress={() => {
              onFocus(!showModal);
            }}>
            <Ionicons name="close" size={24} color="#061822" />
          </IconButton>
        </Row>
        <CustomView style={{height: 200}}>
          <List
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: {id: any}) => item.id}
          />
        </CustomView>
      </ModalComponent>
    </FormGroup>
  );
};

export const Select = styled.TouchableOpacity<InputProps>`
    height: ${(props: InputProps) => (props.multiline ? '150px' : '48px')};
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    padding: 12px 16px;
    border-radius: 16px;
  `;
export const SelectItem = styled.TouchableOpacity<InputProps>`
  font-family: Poppins-Regular;
  height: 48px;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  font-size: 15px;
  padding: 8px;
  border-radius: 16px;
`;
export const LabelButton = styled(Text)<InputProps>`
  font-weight: 400;
  text-align: left;
  margin-bottom: 4px;
  color: #959aa8;
`;
export const List = styled.FlatList`
  font-weight: 500;
  text-align: left;
  text-transform: none;
  margin-bottom: 4px;
`;
