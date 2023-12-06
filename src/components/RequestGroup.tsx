import React, {FC} from 'react';
import styled from 'styled-components/native';
import {FONTS, themeLight} from '../constants/colors';
import {Row} from './Containers';
import {Caption, Text} from './Texts';
import VacationsIcon from '../../assets/icons_svg/vacations_icon';
import IncapacityIcon from '../../assets/icons_svg/incapacity_icon';
import OtherRequestIcon from '../../assets/icons_svg/other_request_icon';
import {str} from '../locales/Locale';

type ContainerProps = {
  title: string;
  caption?: any;
  captionArr?: Array<any>;
  row?: boolean;
  center?: boolean;
  gray?: boolean;
  style?: any;
  captionStyle?: any;
};
export const RequestInfo: FC<ContainerProps> = ({
  title,
  caption,
  captionArr,
  row = false,
  center = false,
  gray = false,
  style,
  captionStyle,
}) => {
  return (
    <Row
      align={center ? 'center' : 'flex-start'}
      justify={center ? 'center' : 'flex-start'}
      fdirection={row ? 'row' : 'column'}
      style={{
        marginVertical: 9,
        ...style,
      }}>
      {captionArr ? (
        <>
          <Text
            bold
            style={{
              alignSelf: center ? 'center' : 'flex-start',
              color: gray ? themeLight.captionColor : themeLight.textColor,
              ...FONTS.h4,
            }}>
            {title}
          </Text>
          {captionArr.map((item, index) => {
            return (
              <Caption key={index} style={{...captionStyle}}>
                {item.person_name} - {item.comment}
                {'\n'}
              </Caption>
            );
          })}
        </>
      ) : (
        <>
          <Text
            bold
            style={{
              alignSelf: center ? 'center' : 'flex-start',
              color: gray ? themeLight.captionColor : themeLight.textColor,
              ...FONTS.h4,
            }}>
            {title}
          </Text>
          <Caption style={[captionStyle, {textTransform: 'none'}]}>
            {caption}
          </Caption>
        </>
      )}
    </Row>
  );
};

type ThumbnailProps = {
  style?: any;
  idRequestType: number;
  statusCard: any;
};

export const RequestIcon: FC<ThumbnailProps> = ({
  idRequestType,
  statusCard,
}) => {
  return (
    <ThumbnailContainer
      style={{
        backgroundColor: statusCard?.color,
      }}>
      {idRequestType === 1 ? (
        <VacationsIcon size={22} color={'#FFFFFF'} />
      ) : idRequestType === 2 ? (
        <IncapacityIcon size={22} color={'#FFFFFF'} />
      ) : (
        <OtherRequestIcon size={22} color={'#FFFFFF'} />
      )}

      <Caption style={{color: '#FFFFFF', ...FONTS.h5}}>
        {statusCard?.name}
      </Caption>
    </ThumbnailContainer>
  );
};
type RequestTypeProps = {
  style?: any;
  idRequestType: any;
  statusCard: any;
};

export const RequestType: FC<RequestTypeProps> = ({
  statusCard,
  idRequestType,
}) => {
  return (
    <RequestTypeContainer>
      <Text bold size="medium" style={{...FONTS.body3}}>
        {idRequestType === 3
          ? str('requestDetail.requestOther', {
              requestType: str('requestDetail.requesType.other'),
            })
          : str('requestDetail.requestFor', {
              requestType:
                idRequestType === 1
                  ? str('requestDetail.requesType.holiday')
                  : idRequestType === 2
                  ? str('requestDetail.requesType.disability')
                  : str('requestDetail.requesType.other'),
            })}
      </Text>
      <RequestIcon statusCard={statusCard} idRequestType={idRequestType} />
    </RequestTypeContainer>
  );
};

type StyleProps = {
  margin?: string;
  outline: boolean;
  theme: any;
};
const BaseThumbnailStyles = `
  flex-direction: row;
  width: 114px;
  height: 28px; 
  min-height: 28px;
  min-width: 114px;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px; 
  max-height: 28px;
  padding-horizontal: 12px;
`;

const ThumbnailContainer = styled.View<StyleProps>`
  ${BaseThumbnailStyles}
`;

export const RequestTypeContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;
