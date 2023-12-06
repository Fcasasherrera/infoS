import React, {FC, useState} from 'react';
import DocumentPicker, {isInProgress} from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomView,
  Row,
  SelectItem,
  SimpleBottomSheet,
  Text,
  IconButton,
  ModalComponent,
  Title,
  Button,
} from '../components';
import ImagePicker from 'react-native-image-crop-picker';
import {str} from '../locales/Locale';
import {bytesToMegaBytes} from '../utils';

type BottomSheetProps = {
  visible: boolean;
  onBack: any;
  onValue: any;
  onlyImage?: boolean;
  crop?: boolean;
  dimensions?: any;
};

export const FilePicker: FC<BottomSheetProps> = ({
  visible = false,
  onBack,
  onValue,
  onlyImage,
  crop = true,
  dimensions = {
    width: 1280,
    height: 720,
  },
}) => {
  const [imageModal, setImageModal] = useState(false);
  const [error, setError] = useState(false);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.log(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const fileSelect = async (type: string) => {
    if (type === 'photo') {
      // onBack(false);
      setImageModal(true);
      return;
    } else {
      try {
        const pickerResult = await DocumentPicker.pickSingle({
          type: 'application/pdf',
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
        });
        const file: any = pickerResult;
        if (bytesToMegaBytes(file?.size * 1) > 4) {
          setError(true);
        } else {
          onValue(pickerResult);
        }
      } catch (e) {
        handleError(e);
      }
    }
  };
  const imageSelect = async (type: string) => {
    let image;
    let optionType = type === 'photo' ? 'openCamera' : 'openPicker';
    let options = {...dimensions, cropping: crop};

    try {
      image = await ImagePicker[optionType](options);
    } catch (error) {}
    if (image) {
      const file = image;
      if (bytesToMegaBytes(file?.size * 1) > 4) {
        setError(true);
      } else {
        if (!onlyImage) {
          setImageModal(false);
          onValue(image);
        } else {
          onBack(false);
          onValue(image);
        }
      }
    }
    return true;
  };
  return !onlyImage ? (
    <SimpleBottomSheet
      height={200}
      onBack={() => {
        onBack(false);
      }}
      visible={visible}>
      <Row>
        <Text>{str('pharafrases.typeFile')}</Text>
      </Row>
      <CustomView style={{marginTop: 12}}>
        <SelectItem
          onPress={() => {
            fileSelect('file');
          }}>
          <Text>{str('pharafrases.document')}</Text>
        </SelectItem>
        <SelectItem
          onPress={() => {
            fileSelect('photo');
          }}>
          <Text>{str('pharafrases.image')}</Text>
        </SelectItem>
        <ModalComponent
          alert
          visible={error}
          onBack={() => {
            setError(false);
          }}
          height={'220'}>
          <CustomView style={{padding: 16}}>
            <Title size="medium">{str('common.ups')}</Title>
            <Text style={{marginTop: 8}}>
              {str('noticeFormScreen.errorMessage')}
            </Text>
          </CustomView>
          <CustomView>
            <Button
              style={{marginTop: 10}}
              onPress={() => {
                setError(false);
              }}>
              {str('loginScreen.loginButtonError')}
            </Button>
          </CustomView>
        </ModalComponent>
      </CustomView>
      <SimpleBottomSheet
        height={160}
        onBack={() => {
          setImageModal(false);
        }}
        visible={imageModal}>
        <Row>
          <Text>{str('pharafrases.wherePhoto')}</Text>
        </Row>
        <Row
          fdirection="row"
          justify="space-around"
          align="center"
          style={{marginTop: 24}}>
          <IconButton
            outline
            onPress={() => {
              imageSelect('photo');
            }}>
            <Ionicons name="camera-outline" size={24} color="#061822" />
          </IconButton>
          <IconButton
            outline
            onPress={() => {
              imageSelect('file');
            }}>
            <Ionicons name="folder-open-outline" size={24} color="#061822" />
          </IconButton>
        </Row>
        <ModalComponent
          alert
          visible={error}
          onBack={() => {
            setError(false);
          }}
          height={'220'}>
          <CustomView style={{padding: 16}}>
            <Title size="medium">{str('common.ups')}</Title>
            <Text style={{marginTop: 8}}>
              {str('noticeFormScreen.errorMessage')}
            </Text>
          </CustomView>
          <CustomView>
            <Button
              style={{marginTop: 10}}
              onPress={() => {
                setError(false);
              }}>
              {str('loginScreen.loginButtonError')}
            </Button>
          </CustomView>
        </ModalComponent>
      </SimpleBottomSheet>
    </SimpleBottomSheet>
  ) : (
    <SimpleBottomSheet
      height={160}
      onBack={() => {
        onBack(false);
      }}
      visible={visible}>
      <Row>
        <Text>{str('pharafrases.wherePhoto')}</Text>
      </Row>
      <Row
        fdirection="row"
        justify="space-around"
        align="center"
        style={{marginTop: 24}}>
        <IconButton
          outline
          onPress={() => {
            imageSelect('photo');
          }}>
          <Ionicons name="camera-outline" size={24} color="#061822" />
        </IconButton>
        <IconButton
          outline
          onPress={() => {
            imageSelect('file');
          }}>
          <Ionicons name="folder-open-outline" size={24} color="#061822" />
        </IconButton>
      </Row>
      <ModalComponent
        alert
        visible={error}
        onBack={() => {
          setError(false);
        }}
        height={'220'}>
        <CustomView style={{padding: 16}}>
          <Title size="medium">{str('common.ups')}</Title>
          <Text style={{marginTop: 8}}>
            {str('noticeFormScreen.errorMessage')}
          </Text>
        </CustomView>
        <CustomView>
          <Button
            style={{marginTop: 10}}
            onPress={() => {
              setError(false);
            }}>
            {str('loginScreen.loginButtonError')}
          </Button>
        </CustomView>
      </ModalComponent>
    </SimpleBottomSheet>
  );
};
