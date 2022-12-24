import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  messages: [],
};

export const messagelice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export default messagelice.reducer;
export const addMessage = messagelice.actions.pushMessage;
