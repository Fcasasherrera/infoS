import React, {FC, useEffect, useState} from 'react';
// Components
import {
  FadeInView,
  Row,
  Thumbnail,
  CustomView,
  Text,
  Caption,
  CustomTouchable,
  FileModal,
} from '../../components';
// Constants
import {SIZES, statusColor, themeLight} from '../../constants/colors';
// Svgs
import ViewPdfImage from '../../components/ViewPdfImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomMoment} from '../../utils';
import {BASE_URL_FILES} from '../../constants/.env';
import {ContainerNoF} from '../../navigation/options';
import {MarkdownView} from 'react-native-markdown-view';

// Parte de arriba de la cardNews
function renderCardNewsTop(item: any) {
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
        <Text>{item.title}</Text>
        <Caption>{CustomMoment(item.created)}</Caption>
      </CustomView>
    </Row>
  );
}

const NewsDetailScreen: FC = (params: any) => {
  // Constants
  const {route} = params;
  const {item} = route.params;
  // const [isFavorite, setIsFavorite] = useState(false);
  const [openFileModal, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const getToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    getToken();
  }, []);

  return (
    <ContainerNoF>
      <FadeInView
        isScroll
        align="flex-start"
        justify="flex-start"
        style={{padding: 18}}>
        {/* Se renderiza la pate de arriba de la cardNews */}
        {renderCardNewsTop(item)}

        {item.file_data != null && (
          <CustomTouchable
            style={{
              marginTop: 8,
              height: item.file_data.type === 'application/pdf' ? 450 : 200,
              borderRadius: 8,
            }}
            onPress={() => {
              setIsOpen(true);
            }}>
            <ViewPdfImage
              style={{borderRadius: 16}}
              typePDF={item.file_data.type === 'application/pdf'}
              url={`${BASE_URL_FILES}files/${item.file_data.id}?token=${token}`}
              resizeMode={
                item.file_data.type === 'application/pdf' ? 'stretch' : 'cover'
              }
            />
          </CustomTouchable>
        )}

        <MarkdownView
          style={{
            paddingVertical: SIZES.base * 2,
            color: themeLight.captionColor,
          }}>
          {item.body}
        </MarkdownView>

        {/* <IconButton
          onPress={() => setIsFavorite(!isFavorite)}
          style={{alignSelf: 'flex-end'}}>
          {isFavorite ? <LikeFill size={24} /> : <LikeOutline size={24} />}
        </IconButton> */}
        {item.file_data != null && (
          <FileModal
            typePDF={item.file_data.type === 'application/pdf'}
            url={`${BASE_URL_FILES}files/${item.file_data.id}?token=${token}`}
            visible={openFileModal}
            onBack={() => {
              setIsOpen(false);
            }}
          />
        )}
      </FadeInView>
    </ContainerNoF>
  );
};

export default NewsDetailScreen;
