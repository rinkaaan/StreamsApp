import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../common/reducers"

export interface PlayerState {
  currentTime: number
}

const initialState: PlayerState = {
  currentTime: 0,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<PlayerState>>) => {
      return { ...state, ...action.payload }
    },
    resetSlice: () => {
      return initialState
    }
  },
})

export const playerReducer = playerSlice.reducer
export const playerActions = playerSlice.actions
export const playerSelector = (state: RootState) => state.player
