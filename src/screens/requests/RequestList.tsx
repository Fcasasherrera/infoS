import React, {FC, useState, useEffect} from 'react';
import {
  getNextPageRequest,
  getRequestsAPI,
  HideErrorRequestAlert,
} from '../../redux/requests/RequestAction';
import {requestsSelector} from '../../redux/requests/RequestSelector';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  FadeInView,
  Text,
  CustomView,
  Title,
  Row,
  Caption,
  ButtonNewRequest,
  CustomImage,
  IconButton,
  Hr,
  ModalComponent,
  Button,
} from '../../components';
import {FlatList, Platform} from 'react-native';
import {str} from '../../locales/Locale';
import FilterSvg from '../../../assets/FilterSvg';
import {CardRequestList} from '../../components/CardRequestList';
import {DotIndicator} from 'react-native-indicators';
import {FONTS, themeLight} from '../../constants/colors';
import RequestsFilters from '../../components/RequestsFilters';
import RequestStatusFilters from '../../components/RequestStatusFilters';
import {
  createUrlParamsByObject,
  getTypeRequest,
  validateUser,
} from '../../utils';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import {shallowEqual} from 'react-redux';

const RequestList: FC = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    employee: 'True',
    status: '1,2,3,4,5',
    type: '1,2,3',
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [index, setIndex] = useState<any>(9);
  const {loading, data, requestItems, activeTab, error, errorMessage} =
    useAppSelector(requestsSelector, shallowEqual);
  const {user} = useAppSelector(loginSelector);
  const userRole = validateUser(user?.role.name) ? false : true;

  const [allFilters, setAllFilters] = useState({
    filterType: '',
    filterDate: '',
    filterOrder: '',
  });

  useEffect(() => {
    if (!loading) {
      setLoadingMore(false);
    }
  }, [loading]);

  useEffect(() => {
    if (activeTab === 0) {
      onChange(index);
    }
  }, [activeTab]);
  useEffect(() => {
    if (!userRole) {
      if (activeTab === 0) {
        setLoadingMore(true);
        const urlParams = createUrlParamsByObject(filters);
        dispatch(getRequestsAPI(urlParams));
      }
    } else {
      setLoadingMore(true);
      const urlParams = createUrlParamsByObject(filters);
      dispatch(getRequestsAPI(urlParams));
    }
  }, [filters]);

  // Function for append Filters

  const onChange = (index2: any) => {
    setIndex(index2);
    const type = getTypeRequest(allFilters.filterType);
    if (index2 !== 9) {
      setFilters({...filters, status: index2.toString(), type});
    } else {
      setFilters({...filters, status: '1,2,3,4,5', type});
    }
  };

  const toggleFilterModal = () => setFilterModal(!filterModal);
  if (loading && !loadingMore) {
    return (
      <FadeInView>
        <DotIndicator color={themeLight.primary} size={12} count={3} />
      </FadeInView>
    );
  }

  const nextPage = () => {
    dispatch(getNextPageRequest());
  };

  return (
    <FadeInView>
      <CustomView
        style={{marginTop: Platform.OS === 'android' && userRole ? 44 : 16}}>
        <Row fdirection="row" align="center" justify="space-between">
          <Title style={{...FONTS.h3}}>{str('requestsScreens.title')}</Title>
          <IconButton
            onPress={toggleFilterModal}
            justify="center"
            align="center"
            style={{width: '15%'}}>
            <FilterSvg />
          </IconButton>
        </Row>
        {/* Status Filters */}
        <RequestStatusFilters index={index} setIndex={onChange} />

        <Text style={FONTS.body3}>
          {data.length} {str('requestsScreens.tabBarLabel')}
        </Text>
      </CustomView>
      {/* <Hr /> */}

      <FlatList
        data={requestItems.items}
        keyExtractor={(_, index) => index.toString()}
        style={{width: '100%'}}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CardRequestList item={item} index={index} filters={filters} />
        )}
        refreshing={loadingMore}
        onRefresh={() => {
          setLoadingMore(true);
          onChange(index);
        }}
        onEndReached={nextPage}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <Hr />}
        ListEmptyComponent={() => (
          <CustomView style={{marginTop: 16}}>
            <Row>
              <CustomImage
                source={require('../../../assets/images/Mailbox.png')}
                justify-content={'center'}
              />
            </Row>
            <Text
              center="center"
              style={{...FONTS.h3, lineHeight: 32, marginTop: 23}}>
              {str('requestsScreens.none')}
            </Text>
            <Caption center="center" size="small" gray>
              {str('requestsScreens.noneText')}
            </Caption>
          </CustomView>
        )}
      />

      <CustomView bottom={'16'} position={'absolute'}>
        <ButtonNewRequest onPress={() => navigation.navigate('NewRequest')}>
          {str('requestsScreens.btnNew')}
        </ButtonNewRequest>
      </CustomView>
      {/* Type Filters and others*/}
      <RequestsFilters
        index={index}
        setIndex={onChange}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        allFilters={allFilters}
        setAllFilters={setAllFilters}
      />
      <ModalComponent
        alert
        visible={error}
        onBack={() => {
          dispatch(HideErrorRequestAlert());
        }}
        height={'220'}>
        <CustomView style={{padding: 16}}>
          <Title size="medium">{str('common.ups')}</Title>
          <Text style={{marginTop: 8}}>{errorMessage}</Text>
        </CustomView>
        <CustomView>
          <Button
            style={{marginTop: 10}}
            isLoading={loading}
            onPress={() => {
              dispatch(HideErrorRequestAlert());
            }}>
            {str('loginScreen.loginButtonError')}
          </Button>
        </CustomView>
      </ModalComponent>
    </FadeInView>
  );
};

export default RequestList;
