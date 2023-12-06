import React from 'react';
import styled from 'styled-components/native';
import ReminderIcon from '../../assets/icons_svg/reminder_icon';
import ReleaseIcon from '../../assets/icons_svg/release_icon';
import CuriousIcon from '../../assets/icons_svg/curious_icon';
import UrgentIcon from '../../assets/icons_svg/urgent_icon';
import AdviceIcon from '../../assets/icons_svg/advice_icon';
import {SIZES, statusColor} from '../constants/colors';

type ThumbnailProps = {
  newsType: number;
  style?: any;
};

export const Thumbnail: React.FC<ThumbnailProps> = ({newsType, style}) => {
  return (
    <ThumbnailContainer style={style}>
      {/* <RedDot /> */}
      {newsType === 1 ? (
        <ReminderIcon size={22} color={statusColor.green} />
      ) : newsType === 2 ? (
        <ReleaseIcon size={22} color={statusColor.blue} />
      ) : newsType === 3 ? (
        <CuriousIcon size={22} color={statusColor.yellow} />
      ) : newsType === 4 ? (
        <UrgentIcon size={22} color={statusColor.red} />
      ) : (
        <AdviceIcon size={22} color={statusColor.orange} />
      )}
    </ThumbnailContainer>
  );
};

type StyleProps = {
  margin?: string;
  outline: boolean;
  width?: string;
  height?: string;
  theme: any;
};
const BaseThumbnailStyles = `
  width: 40px;
  height: 40px; 
  min-height: 40px;
  min-width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px; 
  max-height: 40px;
`;

// const RedDot = styled.View`
//   ${RedDotStyles}
// `;
const ThumbnailContainer = styled.View<StyleProps>`
  ${BaseThumbnailStyles}
`;
export const ProfileContainer = styled.TouchableOpacity`
  width: 144px;
  height: 144px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${(props: StyleProps) => props.theme.white};
  border-radius: 250px;
  padding: 6px;
`;

export const ProfileSmall = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 250px;
`;
export const ProfilePadding = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${(props: StyleProps) => props.theme.primaryProfile};
  background-color: ${(props: StyleProps) => props.theme.white};
  border-radius: 250px;
  padding: 6px;
`;
export const ProfileImage = styled.Image<StyleProps>`
  border-radius: 250px;
  background-color: ${(props: StyleProps) => props.theme.white};
  width: ${(props: StyleProps) => (props.width ? props.width : '100%')};
  height: ${(props: StyleProps) => (props.height ? props.height : '100%')};
  resize-mode: contain;
`;
