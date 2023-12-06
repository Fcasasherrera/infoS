import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import CustomAxios from '../../network/CustomAxios';
import {str} from '../../locales/Locale';
import {
  ApproveRequestData,
  BodyNewRequest,
  ResolveRequestData,
} from '../../types/requests';

export const getRequestsAPI = createAsyncThunk(
  'SET_LISTREQUESTS',
  async (urlParams?: any) => {
    try {
      const url: string = `requests${urlParams ? `?${urlParams}` : ''}`;
      // const result = await CustomAxios.get(url);
      const data = [];
      // console.log('RESULT => ', url);
      if (urlParams._searchParams[0][0] === 'employee') {
        return {data: data, type: 'employee'};
      } else {
        return {dataTeam: data, type: 'root'};
      }
    } catch (error: any) {
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      console.log('request: error', error?.response.data);

      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);
export const getNextPageRequest = createAction('NEXT_PAGE_REQUEST_LIST');
export const getNextPageTeam = createAction('NEXT_PAGE_TEAM_LIST');

export const getStatusAccountable = createAsyncThunk(
  'GET_STATUSACCOUNTABLE',
  async (idRequest?: string) => {
    try {
      const url: string = `requests/accountables/${idRequest}`;
      const result = await CustomAxios.get(url);
      const data = result?.data ?? [];
      // console.log('RESULT => ', data);
      return {statusRequests: data};
    } catch (error: any) {
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      console.log('here', error?.response.data);

      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);

export const HideErrorRequestAlert = createAction('HIDE_ERROR_REQUEST_ALERT');
export const HideErrorRequest = createAction('HIDE_ERROR_REQUEST');

export const ToggleDeleteModal = createAction('TOGGLE_DELETE_MODAL');

export const HideSuccesRequestAlert = createAction(
  'HIDE_SUCCESS-REQUEST-ALERT',
);

export const HideApprovedRequestAlert = createAction(
  'HIDE_APPROVED-REQUEST-ALERT',
);

export const HideRejectedRequestAlert = createAction(
  'HIDE_REJECTED-REQUEST-ALERT',
);

const isValidRequest = (request: BodyNewRequest) => {
  return (
    request.type === null ||
    request.comments === '' ||
    request.additional_info.idClient === 0
  );
};

const hasValidDates = (request: BodyNewRequest) => {
  if (request.type !== 3) {
    return (
      request.additional_info.enddate === '' ||
      request.additional_info.days === 0 ||
      request.additional_info.startdate === ''
    );
  } else {
    return false;
  }
};
export const postRequestsAPI = createAsyncThunk(
  'POST_REQUEST',
  async (request: BodyNewRequest) => {
    if (isValidRequest(request)) {
      if (hasValidDates(request))
        return {
          error: true,
          errorMessage: str('newRequests.errorMessage'),
        };
    }
    // console.log(request);

    try {
      const resp = await CustomAxios.post('/requests', request);

      return {success: true};
    } catch (error: any) {
      const respError = error?.response?.data?.error ?? '';

      console.log('ERRORES', error);

      return {
        errorRequest: true,
        errorMessage: str(error.response.data.code),
      };
    }
  },
);

export const setActiveTab = createAsyncThunk(
  'SET_ACTIVE_TAB',
  async (activeTab: number) => {
    try {
      return {activeTab: activeTab};
    } catch (error: any) {
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);

export const deleteRequest = createAsyncThunk(
  'DELETE_REQUEST',
  async (idStatement: number) => {
    try {
      const result = await CustomAxios.delete(`/requests/${idStatement}`);
      const data = result?.data ?? [];
      return true;
    } catch (error: any) {
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);

export const approveRequest = createAsyncThunk(
  'PUT_REQUEST',
  async (requests: ApproveRequestData) => {
    try {
      const result = await CustomAxios.put(
        `/requests/${requests.id}`,
        requests,
      );
      return requests.idRequestStatus === 2
        ? {approved: true}
        : {rejected: true};
    } catch (error: any) {
      /*  console.log(
        'error al aprobar la solicitud ',
        error?.response.data ?? error,
      ); */
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);

export const resolveRequestAPI = createAsyncThunk(
  'RES_REQUEST',
  async (requests: ResolveRequestData) => {
    try {
      const result = await CustomAxios.put(
        `/requests/${requests.id}`,
        requests,
      );
      const data = result?.data ?? [];
      // console.log('RESULT =>', result);
      return true;
    } catch (error: any) {
      console.log(
        'error al resolver la solicitud ',
        error?.response.data ?? error,
      );
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);

export const updateRequestApi = createAsyncThunk(
  'UPDATE_REQUEST',
  async (requests: BodyNewRequest) => {
    try {
      const result = await CustomAxios.put(
        `/requests/${requests.id}`,
        requests,
      );

      // console.log('sirve', result);
      return true;
    } catch (error: any) {
      console.log(
        'error al aprobar la solicitud ',
        error?.response.data ?? error,
      );
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      return {
        errorRequest: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);
