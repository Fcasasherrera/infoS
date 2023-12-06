import React, {FC} from 'react';
import {Modal, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {themeLight} from '../constants/colors';
import {CustomView} from './Containers';
import Succes_icon from '../../assets/icons_svg/succes_icon';

type BottomSheetProps = {
  visible: boolean;
  alert?: boolean;
  hasList?: boolean;
  onBack: any;
  style?: any;
  children?: any;
  height?: Number | String;
  successIcon?: boolean;
};

export const ModalComponent: FC<BottomSheetProps> = ({
  children,
  visible = false,
  alert = false,
  hasList = false,
  onBack,
  style,
  height,
}) => {
  return visible ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onBack}>
      <BackContainer onPress={onBack}>
        <Card style={style} height={height}>
          {!alert && (
            <HeaderModal>
              <HeaderButton onPress={onBack}>
                <Icon name="x" size={24} color={themeLight.black} />
              </HeaderButton>
            </HeaderModal>
          )}
          {hasList ? (
            <CustomView>{children}</CustomView>
          ) : (
            <ScrollView>{children}</ScrollView>
          )}
        </Card>
      </BackContainer>
    </Modal>
  ) : (
    <></>
  );
};
export const ModalSuccess: React.FC<BottomSheetProps> = ({
  children,
  visible = false,
  alert = false,
  hasList = false,
  onBack,
  style,
  height,
  successIcon = true,
}) => {
  return visible ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onBack}>
      <BackContainer onPress={onBack}>
        <Card style={style} height={height}>
          {successIcon && <Succes_icon />}

          {!alert && (
            <HeaderModal>
              <HeaderButton onPress={onBack}>
                <Icon name="x" size={24} color={themeLight.black} />
              </HeaderButton>
            </HeaderModal>
          )}
          {hasList ? (
            <CustomView>{children}</CustomView>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          )}
        </Card>
      </BackContainer>
    </Modal>
  ) : (
    <></>
  );
};
type CardProps = {
  theme: any;
  height?: Number | String;
};
const HeaderModal = styled.View<CardProps>`
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${(props: CardProps) => props.theme.backgroundColor};
  ${(props: CardProps) => props.height && `height: ${props.height}px`}
`;
const HeaderButton = styled.TouchableOpacity<CardProps>``;
const Card = styled.View<CardProps>`
  border-radius: 8px;
  padding: 16px;
  margin-horizontal: 18px;
  background-color: ${(props: CardProps) => props.theme.backgroundColor};
  justify-content: flex-end;
  ${(props: CardProps) => props.height && `height: ${props.height}px`}
`;
const BackContainer = styled.View<CardProps>`
  flex: 1;
  justify-content: center;
  background-color: #00000099;
`;
export default ModalComponent;
