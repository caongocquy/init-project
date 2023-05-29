export default {
  load: (state, action, type) => {
    let newState = {
      ...state,
      has_updated: !state.has_updated
    };

    newState[type] = {
      ...newState[type],
      requesting: true,
      message: action.message,
      error: false,
    }
    return newState;
  },

  loadSuccess: (state, action, type) => {
    let newState = {
      ...state,
      has_updated: !state.has_updated
    };

    newState[type] = {
      ...newState[type],
      data: action.data,
      requesting: false,
      message: action.message,
      error: false,
    }
    return newState;
  },

  loadFail: (state, action, type) => {
    let newState = {
      ...state,
      has_updated: !state.has_updated
    };
  
    newState[type] = {
      ...newState[type],
      requesting: false,
      message: action.message && action.message.message ? action.message.message : action.message,
      error: true,
    }
   
    return newState;
  },

  loadWithLoadMore: (state, action, type) => {
    let newState = {
      ...state,
      has_updated: !state.has_updated
    };

    newState[type] = {
      ...newState[type],
      requesting: true,
      message: action.message,
      error: false,
    }
    return newState;
  },

  loadWithLoadMoreSuccess: (state, action, type) => {
    let newState = {
      ...state,
      has_updated: !state.has_updated
    };
    // console.log('loadWithLoadMoreSuccess', action.api, action);
    const currentPage = action.response.current_page;

    newState[type] = {
      ...newState[type],
      current_page: currentPage,
      total_page: action.response.last_page,
      total_count: action.response.total,
      data: currentPage === 1 ? action.response.data : state[type].data.concat(action.response.data),
      requesting: false,
      message: action.message,
      error: false,
    }
    return newState;
  },

  loadWithLoadMoreFail: (state, action, type) => {
    let newState = {
      ...state,
      has_updated: !state.has_updated
    };
    
    const lastPage = newState[type].current_page;

    newState[type] = {
      ...newState[type],
      requesting: false,
      message: action.message,
      error: true,
    }
    return newState;
  }
};