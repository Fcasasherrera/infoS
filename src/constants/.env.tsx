import React from 'react';

import {str} from '../locales/Locale';
import FilterAll from '../../assets/icons_svg/filter_all';
import VacationsIcon from '../../assets/icons_svg/vacations_icon';
import IncapacityIcon from '../../assets/icons_svg/incapacity_icon';
import OtherRequestIcon from '../../assets/icons_svg/other_request_icon';
import {requestStatusColor} from './colors';

export const BASE_URL: string =
  'https://app.solana.com.mx/informes_corporativos/apimovil/';
export const BASE_URL_FILES: string = 'https://stg-crossappapi.atomic32.com/';

export const TIMEOUT: number = 100000;

export const typesRequests = [
  {
    id: '1',
    icon: <VacationsIcon size={22} color={requestStatusColor.approved} />,
    title: str('requestDetail.requesType.holiday'),
  },
  {
    id: '2',
    icon: <IncapacityIcon size={22} color={requestStatusColor.pending} />,
    title: str('requestDetail.requesType.disability'),
  },
  {
    id: '3',
    icon: <OtherRequestIcon size={22} color={requestStatusColor.other} />,
    title: str('requestDetail.requesType.other'),
  },
  {
    id: '4',
    icon: <FilterAll size={18} />,
    title: str('requestDetail.requesType.all'),
  },
];
export const typesRequestsCreate = [
  {
    id: '1',
    icon: <VacationsIcon size={22} color={requestStatusColor.approved} />,
    title: str('requestDetail.requesType.holiday'),
  },
  {
    id: '2',
    icon: <IncapacityIcon size={22} color={requestStatusColor.pending} />,
    title: str('requestDetail.requesType.disability'),
  },
  {
    id: '3',
    icon: <OtherRequestIcon size={22} color={requestStatusColor.other} />,
    title: str('requestDetail.requesType.other'),
  },
];

export const statusColors: any = {
  pending: {
    color: requestStatusColor.pending,
    name: str('requestDetail.requestStatus.pending'),
    key: 'pending',
  },
  localPending: {
    color: requestStatusColor.pendingAccountable,
    name: str('requestDetail.requestStatus.pending'),
    key: 'localPending',
  },
  approved: {
    color: requestStatusColor.approved,
    name: str('requestDetail.requestStatus.approved'),
    key: 'approved',
  },
  rejected: {
    color: requestStatusColor.rejected,
    name: str('requestDetail.requestStatus.rejected'),
    key: 'rejected',
  },
  cancelled: {
    color: requestStatusColor.cancelled,
    name: str('requestDetail.requestStatus.cancelled'),
    key: 'cancelled',
  },
  resolved: {
    color: requestStatusColor.other,
    name: str('requestDetail.requestStatus.resolved'),
    key: 'resolved',
  },
};
