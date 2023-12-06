import {Dimensions, Image, Modal, Platform} from 'react-native';
import React, {FC, useState} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import {Caption, CustomView, Row, SimpleBottomSheet, Text, Button} from '.';
import {IconButton} from './Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import ViewPdfImage from './ViewPdfImage';
import {FONTS} from '../constants/colors';
import {str} from '../locales/Locale';

type FileModalprops = {
  visible: boolean;
  canDelete?: boolean;
  onBack: any;
  onDelete?: any;
  url: string;
  typePDF?: boolean;
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const FileModal: FC<FileModalprops> = ({
  visible = false,
  canDelete = false,
  onBack,
  onDelete,
  url,
  typePDF,
}) => {
  const [areUSure, setSure] = useState(false);
  // console.log(url, 'url');

  return visible ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onBack}>
      <CustomView style={{flex: 1, backgroundColor: 'black'}}>
        <IconButton
          onPress={onBack}
          rounded
          style={{
            top: Platform.OS === 'android' ? 16 : 44,
            left: 16,
            alignItems: 'flex-end',
            position: 'absolute',
            zIndex: 99,
          }}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={!typePDF ? '#fff' : '#000'}
          />
        </IconButton>
        {canDelete && (
          <IconButton
            onPress={() => {
              setSure(true);
            }}
            rounded
            style={{
              top: Platform.OS === 'android' ? 16 : 44,
              right: 16,
              alignItems: 'flex-end',
              position: 'absolute',
              zIndex: 99,
            }}>
            <SimpleLine
              name="trash"
              size={24}
              color={!typePDF ? '#fff' : '#000'}
            />
          </IconButton>
        )}
        {!typePDF ? (
          <ImageZoom
            cropWidth={windowWidth}
            cropHeight={windowHeight}
            imageWidth={windowWidth}
            imageHeight={300}>
            <Image
              source={{uri: url}}
              resizeMode="contain"
              style={{height: 300, width: '100%'}}
            />
          </ImageZoom>
        ) : (
          <ViewPdfImage url={url} typePDF={true} resizeMode={'stretch'} />
        )}
      </CustomView>
      <SimpleBottomSheet
        height={300}
        visible={areUSure}
        onBack={() => {
          setSure(false);
        }}>
        <Row>
          <Text center style={{...FONTS.h3, lineHeight: 36}}>
            {str('uSureFile')}
          </Text>
          <Caption gray center style={{lineHeight: 24}}>
            {str('uSureFileDesc')}
          </Caption>
        </Row>
        <Button onPress={onDelete} style={{marginBottom: 8, marginTop: 30}}>
          {str('newsScreen.deleteOption')}
        </Button>
        <Button
          link
          onPress={() => {
            setSure(false);
          }}>
          {str('cancel')}
        </Button>
      </SimpleBottomSheet>
    </Modal>
  ) : (
    <></>
  );
};
