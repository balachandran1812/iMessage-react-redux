import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    chatName: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setChat: (state, action) => {
      console.log(`object`, action)
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
  },
});

export const { setChat } = chatSlice.actions;

export const selectChatId = (state) => state.chat.chatId;
export const selectChatName = (state) => state.chat.chatName;


export default chatSlice.reducer;
