import React, {useEffect, useState, FC} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Button,
  Row,
  Caption,
  Title,
  FadeInView,
  CustomView,
} from '../../components';
import {gradients, SIZES} from '../../constants/colors';

import {ContainerFluid} from '../../navigation/options';

const WelcomeScreen: FC = (props: any) => {
  const {navigation} = props;
  const [visibleText, setVisibleText] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setVisibleText(true);
    }, 700);
    return () => clearTimeout(time);
  }, []);
  return (
    <ContainerFluid>
      <View style={styles.main}>
        <CustomView
          style={{
            backgroundColor: '#068DC4',
            flex: 1,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            alignItems: 'center',
          }}>
          <FadeInView
            show={visibleText}
            style={styles.logoThumbnail}
            justify="flex-start">
            <Image
              resizeMode="contain"
              style={styles.logoImg}
              source={require('../../../assets/images/iconLogo.png')}
            />
          </FadeInView>
        </CustomView>

        <CustomView style={styles.bottomContainer}>
          <FadeInView
            show={visibleText}
            style={{
              backgroundColor: 'transparent',
            }}
            justify="flex-start">
            <Image
              resizeMode="contain"
              style={styles.logoName}
              source={require('../../../assets/images/logoIntra.png')}
            />
            <Caption center={true} style={{marginTop: 12}}>
              {
                'El mejor aliado para llevar el control de tu desarrollo en solana'
              }
            </Caption>
          </FadeInView>
          <Button
            position="right"
            iconName="arrow-right"
            iconColor="#FFF"
            style={{width: 180}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            {'Comenzar'}
          </Button>
        </CustomView>
      </View>
    </ContainerFluid>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 60,
  },
  logoThumbnail: {
    width: 125,
    height: 125,
    backgroundColor: 'white',
    borderRadius: 150,
    position: 'absolute',
    bottom: -50,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 1,

    padding: 24,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  logoName: {
    height: 40,
    marginVertical: 12,
  },
});
export default WelcomeScreen;
