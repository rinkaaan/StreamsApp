import { combineReducers } from "@reduxjs/toolkit"
import { mainReducer } from "../routes/mainSlice"
import { playerReducer } from "../routes/subtitle-test/playerSlice"

export const reducers = combineReducers({
  main: mainReducer,
  player: playerReducer,
})

export type RootState = ReturnType<typeof reducers>
