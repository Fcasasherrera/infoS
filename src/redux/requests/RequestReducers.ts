import {createReducer} from '@reduxjs/toolkit';
import {
  getRequestsAPI,
  HideErrorRequestAlert,
  HideErrorRequest,
  HideSuccesRequestAlert,
  postRequestsAPI,
  setActiveTab,
  updateRequestApi,
  deleteRequest,
  approveRequest,
  resolveRequestAPI,
  ToggleDeleteModal,
  getStatusAccountable,
  HideApprovedRequestAlert,
  HideRejectedRequestAlert,
  getNextPageRequest,
  getNextPageTeam,
} from './RequestAction';
import {str} from '../../locales/Locale';
export interface RequestsState {
  data: any;
  requestItems: any;
  dataTeam: any;
  teamItems: any;
  statusRequests: Array<any>;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  errorRequest: boolean;
  success: boolean;
  successMessage: string;
  approved: boolean;
  rejected: boolean;
  deleteModal: boolean;
  activeTab: number;
}

const INITIAL_STATE: RequestsState = {
  data: [],
  requestItems: {
    page: 0,
    limit: 8,
    items: [],
  },
  dataTeam: [],
  teamItems: {
    page: 0,
    limit: 8,
    items: [],
  },
  statusRequests: [],
  loading: false,
  error: false,
  errorMessage: str('reduceAlert.requestAlert'),
  errorRequest: false,
  success: false,
  successMessage: str('reduceAlert.requestSucces'),
  approved: false,
  rejected: false,
  deleteModal: false,
  activeTab: 1,
};

const RequestsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(getRequestsAPI.pending, state => {
      return {...state, loading: true};
    })
    .addCase(getRequestsAPI.fulfilled, (state, action) => {
      if (action.payload.type === 'employee') {
        const slicedArray = action.payload.data.slice(0, state.requestItems.limit);  
        return {
        ...state,
        loading: false,
        ...action.payload,
        requestItems: {...state.requestItems, page: 0, items: slicedArray},
      };
      } else {
        const slicedArray = action.payload.dataTeam.slice(0, state.teamItems.limit);  
        return {
        ...state,
        loading: false,
        ...action.payload,
        teamItems: {...state.teamItems, page: 0, items: slicedArray},
      };
      }
    })
    .addCase(getRequestsAPI.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(getStatusAccountable.pending, state => {
      return {...state, loading: true};
    })
    .addCase(getStatusAccountable.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(getStatusAccountable.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(postRequestsAPI.pending, state => {
      return {...state, loading: true};
    })
    .addCase(postRequestsAPI.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(postRequestsAPI.rejected, state => {
      return {...state, loading: false, errorRequest: true};
    })
    .addCase(setActiveTab.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(updateRequestApi.pending, state => {
      return {...state, loading: true};
    })
    .addCase(updateRequestApi.fulfilled, state => {
      return {...state, loading: false};
    })
    .addCase(updateRequestApi.rejected, state => {
      return {...state, loading: false, errorRequest: true};
    })
    .addCase(deleteRequest.fulfilled, state => {
      return {...state, loading: false};
    })
    .addCase(deleteRequest.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(approveRequest.pending, state => {
      return {...state, loading: true};
    })
    .addCase(approveRequest.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(approveRequest.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(resolveRequestAPI.pending, state => {
      return {...state, loading: true};
    })
    .addCase(resolveRequestAPI.fulfilled, (state, action) => {
      return {...state, loading: false};
    })
    .addCase(resolveRequestAPI.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(HideErrorRequestAlert, state => {
      return {
        ...state,
        error: false,
        errorMessage: str('reduceAlert.requestAlert'),
      };
    })
    .addCase(HideErrorRequest, state => {
      return {
        ...state,
        errorRequest: false,
        errorMessage: str('reduceAlert.requestAlert'),
      };
    })
    .addCase(HideSuccesRequestAlert, state => {
      return {
        ...state,
        success: false,
        successMessage: str('reduceAlert.requestSucces'),
      };
    })
    .addCase(HideApprovedRequestAlert, state => {
      return {
        ...state,
        approved: false,
      };
    })
    .addCase(HideRejectedRequestAlert, state => {
      return {
        ...state,
        rejected: false,
      };
    })
    .addCase(ToggleDeleteModal, (state: any) => {
      return {
        ...state,
        deleteModal: !state.deleteModal,
      };
    })
  .addCase(getNextPageRequest, (state, action) => {
      const {limit, page} = state.requestItems;
      const pagevalue = page + 1;
      const responseJson = state.data.slice(
        pagevalue * limit,
        (pagevalue + 1) * limit,
      );
    
      return {
        ...state,
        requestItems: {
          ...state.requestItems,
          page: pagevalue,
          items: [...state.requestItems.items, ...responseJson],
        },
      };
  })
  .addCase(getNextPageTeam, (state, action) => {
      const {limit, page} = state.teamItems;
      const pagevalue = page + 1;
      const responseJson = state.dataTeam.slice(
        pagevalue * limit,
        (pagevalue + 1) * limit,
      );

      return {
        ...state,
        teamItems: {
          ...state.teamItems,
          page: pagevalue,
          items: [...state.teamItems.items, ...responseJson],
        },
      };
    });
});

export default RequestsReducer;
