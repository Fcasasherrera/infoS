/* eslint-disable react-native/no-inline-styles */
import React, {useState, FC, useEffect, useRef} from 'react';
import {Animated, Platform, RefreshControl, ScrollView} from 'react-native';
import {
  CardNews,
  CustomView,
  FadeInView,
  Hr,
  ButtonNewRequest,
  AnimatedHeader,
  Text,
  CardHelp,
  CardAdditional,
  Row,
} from '../../components';
import NewsMenuModal from '../../components/NewsMenuModal';
import {str} from '../../locales/Locale';
import {
  getListCommuniquesAPI,
  getNextPageList,
} from '../../redux/communiques/CommuniquesAction';
import {getEntryTime} from '../../redux/registerTimes/RegisterTimesAction';
import {communiquesSelector} from '../../redux/communiques/CommuniquesSelector';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateUserNews} from '../../utils';
import {batch, shallowEqual} from 'react-redux';

import {useScrollToTop} from '@react-navigation/native';
import {ContainerFluid} from '../../navigation/options';

const CommunicatesListScreen: FC = (props: any) => {
  const {navigation} = props;

  // constants
  const [modalOptionsOpen, setModalOptionsOpen] = useState<boolean>(false);
  const [itemSel, setSelected] = useState<any>({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingMoreEnd, setLoadingMoreEnd] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {loading, data, newsItems} = useAppSelector(
    communiquesSelector,
    shallowEqual,
  );
  const {user} = useAppSelector(loginSelector);

  const scrollViewRef = useRef(null);

  useScrollToTop(scrollViewRef);

  const {role} = user;

  useEffect(() => {
    if (!loading) {
      setLoadingMore(false);
      setLoadingMoreEnd(false);
    }
  }, [loading]);
  const getData = (page: number) => {
    batch(() => {
      dispatch(getListCommuniquesAPI());
    });
  };
  const nextPage = () => {
    setLoadingMoreEnd(true);
    dispatch(getNextPageList());
    setLoadingMoreEnd(false);
  };

  // functions
  useEffect(() => {
    getData(0);
    const getToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    getToken();
  }, []);

  const offset = useRef(new Animated.Value(0)).current;

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  return (
    <ContainerFluid>
      <AnimatedHeader user={user} animatedValue={offset} />
      <FadeInView fluid justify="center" align="center">
        {/* {loading && !loadingMore && !loadingMoreEnd ? (
          <DotIndicator size={10} color={'#000666'} count={3} />
        ) : ( */}
        <>
          <ScrollView
            ref={scrollViewRef}
            style={{flex: 1, backgroundColor: 'white', marginTop: 50}}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: Platform.OS === 'ios' ? 50 : 80,
              paddingBottom: 75,
            }}
            refreshControl={
              <RefreshControl
                refreshing={loadingMore}
                onRefresh={() => {
                  setLoadingMore(true);
                  getData(0);
                }}
              />
            }
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {
                useNativeDriver: false,
                listener: ({nativeEvent}) => {
                  if (
                    !loadingMoreEnd &&
                    !loading &&
                    isCloseToBottom(nativeEvent)
                  ) {
                    nextPage();
                  }
                },
              },
            )}>
            <Row
              justify="space-between"
              fdirection="row"
              style={{marginTop: 16}}>
              <CardHelp />
              <CardAdditional />
              <CardAdditional />
            </Row>
            {newsItems.items.map((item: any, index: number) => (
              <CustomView key={index}>
                <CardNews
                  key={index}
                  modalOpen={(
                    value: boolean | ((prevState: boolean) => boolean),
                  ) => {
                    setModalOptionsOpen(value);
                    setSelected(item);
                  }}
                  item={item}
                  token={token}
                  canEdit={validateUserNews(role.name)}
                />
                <Hr />
              </CustomView>
            ))}
            {data.length === 0 && (
              <CustomView style={{marginTop: 16}} alignItems="center">
                <Text>No hay noticias registradas</Text>
              </CustomView>
            )}
          </ScrollView>
          {validateUserNews(role.name) && (
            <CustomView bottom={'16'} position={'absolute'}>
              <ButtonNewRequest
                onPress={() => navigation.navigate('NewCommunicate')}>
                {str('newsScreen.newsButton')}
              </ButtonNewRequest>
            </CustomView>
          )}

          <NewsMenuModal
            item={itemSel}
            modalOptionsOpen={modalOptionsOpen}
            onBack={() => {
              setModalOptionsOpen(false);
            }}
          />
        </>
        {/* )} */}
      </FadeInView>
    </ContainerFluid>
  );
};

export default CommunicatesListScreen;
