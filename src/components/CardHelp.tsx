import React, {FC} from 'react';
import {Caption, Text} from './Texts';
import {Row} from './Containers';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, View} from 'react-native';
import QuestionIcon from '../../assets/icons_svg/question_icon';
import {str} from '../locales/Locale';

export const CardHelp: FC<{}> = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={undefined}
      style={{marginRight: 8, height: 90, width: 105}}>
      <LinearGradient
        colors={['#CBDEEF', '#E1F1FF']}
        style={{
          borderRadius: 12,
          padding: 10,
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 150,
          }}>
          <QuestionIcon />
        </View>
        <Caption> {str('helpCard.title')}</Caption>
        <Text style={{color: '#0E4A83'}}>{str('helpCard.subtitle')}</Text>
        <Row
          fdirection="row"
          justify="space-between"
          style={{marginTop: 32}}></Row>
      </LinearGradient>
    </TouchableOpacity>
  );
};
