import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SimpleBottomSheet, Row, Text, CustomSelect, Button, Subtitle} from '.';
import {FONTS} from '../constants/colors';
import {str} from '../locales/Locale';
import {typesRequests} from '../constants/.env';

const RequestsFilters: React.FC<{
  filterModal: any;
  setFilterModal: any;
  setIndex: any;
  index: any;
  allFilters: any;
  setAllFilters: any;
}> = ({
  filterModal,
  setFilterModal,
  allFilters,
  setAllFilters,
  setIndex,
  index,
}) => {
  const applyFilters = () => {
    setFilterModal(!filterModal);
    setIndex(index);
  };

  return (
    <SimpleBottomSheet
      visible={filterModal}
      onBack={() => setFilterModal(false)}
      height={250}>
      <Row fdirection="row" justify="space-between">
        <Subtitle size="medium" style={{...FONTS.body3}}>
          {str('requestsScreens.filter')}
        </Subtitle>
        <TouchableOpacity onPress={() => setFilterModal(false)}>
          <Text size="medium" style={{...FONTS.body4}}>
            {str('requestsScreens.close')}
          </Text>
        </TouchableOpacity>
      </Row>
      <CustomSelect
        placeholder={str('requestsScreens.type')}
        value={allFilters.filterType}
        onChange={(item: any) => {
          setAllFilters({...allFilters, filterType: item.title});
        }}
        capitalize
        icon
        data={typesRequests}
      />
      {/* <CustomSelect
        placeholder="Todas las fechas"
        value={allFilters.filterDate}
        onChange={(item: any) => {
          setAllFilters({...allFilters, filterDate: item.title});
        }}
        data={filterDate}
      />
      <CustomSelect
        placeholder="Ordenar por"
        value={allFilters.filterOrder}
        onChange={(item: any) => {
          setAllFilters({...allFilters, filterOrder: item.title});
        }}
        data={filterOrder}
      /> */}
      <Row align={'flex-end'}>
        <Button width="120px" onPress={applyFilters}>
          {str('requestsScreens.add')}
        </Button>
      </Row>
    </SimpleBottomSheet>
  );
};

export default RequestsFilters;
