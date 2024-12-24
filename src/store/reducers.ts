import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import journalReducer from './slices/journalSlice';
import familyReducer from './slices/familySlice';
import messageReducer from './slices/messageSlice';
import calendarReducer from './slices/calendarSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  journal: journalReducer,
  family: familyReducer,
  message: messageReducer,
  calendar: calendarReducer,
});