import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {Subtitle, Text, SimpleBottomSheet, Button} from '../components';
import {FONTS, SIZES} from '../constants/colors';
import {str} from '../locales/Locale';
import {
  deleteComApi,
  getListCommuniquesAPI,
} from '../redux/communiques/CommuniquesAction';
import {Row} from './Containers';
import {useNavigation} from '@react-navigation/native';

const NewsMenuModal: FC<{
  item: any;
  modalOptionsOpen: boolean;
  onBack: any;
}> = ({item, modalOptionsOpen, onBack}) => {
  const navigation: any = useNavigation();
  const [deleteModal, setDelete] = useState(false);
  const dispacth = useAppDispatch();
  const deleteF = async () => {
    const res = await dispacth(deleteComApi(item.id));
    if (res.payload) {
      dispacth(getListCommuniquesAPI());
      onBack();
    }
  };
  return (
    <SimpleBottomSheet height={200} visible={modalOptionsOpen} onBack={onBack}>
      <Row fdirection="row" justify="space-between" align="center">
        <Subtitle size="medium"> {str('newsScreen.modalTitle')}</Subtitle>
        <TouchableOpacity onPress={onBack}>
          <Text> {str('newsScreen.closeOption')}</Text>
        </TouchableOpacity>
      </Row>

      <TouchableOpacity
        style={{marginTop: SIZES.padding}}
        onPress={() => {
          onBack();
          navigation.navigate('NewCommunicate', {item});
        }}>
        <Text> {str('newsScreen.editOption')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: SIZES.padding}}
        onPress={() => setDelete(!deleteModal)}>
        <Text> {str('newsScreen.deleteOption')}</Text>
      </TouchableOpacity>
      <SimpleBottomSheet
        height={250}
        visible={deleteModal}
        onBack={() => setDelete(false)}>
        <Row
          fdirection="row"
          justify="center"
          align="center"
          style={{marginBottom: 8}}>
          <Subtitle style={{textAlign: 'center', ...FONTS.h3}} size="medium">
            {str('deleteTitle')}
          </Subtitle>
        </Row>
        <Text style={{marginBottom: 8}} size="normal" gray center>
        {str('deleteInfo')}
        </Text>
        <Button onPress={deleteF} style={{marginBottom: 8}}>
          {str('confirm')}
        </Button>
        <Button
        outline
          secondary
          onPress={() => {
            setDelete(false);
          }}>
          {str('cancel')}
        </Button>
      </SimpleBottomSheet>
    </SimpleBottomSheet>
  );
};

export default NewsMenuModal;
