import React, {FC} from 'react';
import {FONTS, SIZES, statusColor, themeLight} from '../constants/colors';
import MenuVerticalIcon from '../../assets/icons_svg/menu_vertical_icon';
import {Caption, Text} from './Texts';
import {CustomCardNews, CustomView, Row} from './Containers';
import {useNavigation} from '@react-navigation/native';
import ViewPdfImage from './ViewPdfImage';
import {CustomMoment} from '../utils';
import {BASE_URL_FILES} from '../constants/.env';
import {MarkdownView} from 'react-native-markdown-view';
import {Thumbnail} from './Thumbnails';

// Parte de arriba de la cardNews
function renderCardNewsTop(item: any, modalOpen: any, canEdit: boolean) {
  return (
    <Row fdirection="row" align="center">
      <Thumbnail
        newsType={item.idType}
        style={{
          backgroundColor:
            item.idType === 1
              ? statusColor.green + '40'
              : item.idType === 2
              ? statusColor.blue + '40'
              : item.idType === 3
              ? statusColor.yellow + '40'
              : item.idType === 4
              ? statusColor.red + '40'
              : statusColor.orange + '40',
        }}
      />
      <CustomView style={{marginLeft: SIZES.radius, flex: 1}}>
        <Text style={{...FONTS.h4}}>{item.title}</Text>
        <Caption style={{color: themeLight.captionColor}}>
          {CustomMoment(item.created)}
        </Caption>
      </CustomView>
      {canEdit && (
        <MenuVerticalIcon
          onPress={() => modalOpen(true)}
          width={24}
          height={24}
        />
      )}
    </Row>
  );
}

export const CardNews: FC<{
  item: any;
  token: string | null;
  modalOpen: any;
  canEdit: boolean;
}> = ({item, token, modalOpen, canEdit}) => {
  const navigation: any = useNavigation();

  return (
    <CustomCardNews
      activeOpacity={0.75}
      onPress={() => navigation.navigate('NewsDetail', {item})}>
      {/* Se renderiza la pate de arriba de la cardNews */}
      {renderCardNewsTop(item, modalOpen, canEdit)}
      {item.fileData != null && (
        <CustomView style={{marginTop: 8, height: 170, borderRadius: 8}}>
          <ViewPdfImage
            style={{borderRadius: 16}}
            typePDF={item.fileData.type === 'application/pdf'}
            url={`${item.fileData.url}`}
            resizeMode={'cover'}
          />
        </CustomView>
      )}

      <MarkdownView
        style={{
          paddingVertical: SIZES.base * 2,
          color: themeLight.captionColor,
        }}>
        {item.body}
      </MarkdownView>
    </CustomCardNews>
  );
};
