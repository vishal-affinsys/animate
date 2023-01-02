import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUserData} from '../../Helper/APIController';
const initialState = {
  status: '',
  loading: false,
  error: '',
  messages: [],
};

export const getUserDataFromInternet = createAsyncThunk(
  'GET_USER_DATA',
  async () => {
    const res = await getUserData();
    // console.log(res);
    return res;
  },
);

export const messagelice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserDataFromInternet.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getUserDataFromInternet.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.status = 'succeeded';
        state.loading = false;
        state.messages = state.messages.concat(action.payload);
        if (action.payload.error !== undefined) {
          state.status = 'failed';
          state.error = 'Server error: ' + action.payload.error;
          state.messages = [];
        }
      })
      .addCase(getUserDataFromInternet.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default messagelice.reducer;
export const addMessage = messagelice.actions.pushMessage;
