import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import styled from 'styled-components/native';

type BottomSheetProps = {
  visible: boolean;
  onBack: any;
  style?: any;
  children?: any;
  height?: number | string;
  blue?: boolean;
};

export const SimpleBottomSheet: FC<BottomSheetProps> = ({
  children,
  visible = false,
  onBack,
  style,
  height,
  blue = false,
}) => {
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onBack}
      onBackdropPress={onBack}>
      <CardBottom style={style} height={height} blue={blue}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </CardBottom>
    </BottomSheet>
  );
};
type CardProps = {
  height?: number | string;
  theme: any;
  blue?: boolean;
};
const CardBottom = styled.View<CardProps>`
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 18px;
  padding-top: 16px;
  background-color: ${(props: CardProps) =>
    props.blue ? '#F0F4FC' : props.theme.backgroundColor};
  justify-content: center;
  height: ${(props: CardProps) => (props.height ? props.height : '250')}px;
`;
