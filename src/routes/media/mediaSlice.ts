import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../common/reducers"
import { Media, MediaService } from "../../../openapi-client"
import { getActionName } from "../../common/utils"
import { AsyncStatus, getApiErrorMessage, sleep } from "../../common/typedUtils"
import store, { appDispatch } from "../../common/store"
import { mainActions } from "../mainSlice"
import _ from "lodash"


export interface StreamsState {
  errorMessages: Record<string, string>;
  asyncStatus: Record<string, AsyncStatus>;

  // new media modal
  newStreamsModalOpen: boolean;
  newStreamsUrl: string;

  // list media route
  medias: Array<Media> | undefined;
  noMoreStreams: boolean;
}

const initialState: StreamsState = {
  errorMessages: {},
  asyncStatus: {},

  // new media modal
  newStreamsModalOpen: false,
  newStreamsUrl: "",

  // list media route
  medias: undefined,
  noMoreStreams: false,
}

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<StreamsState>>) => {
      return { ...state, ...action.payload }
    },
    clearErrorMessages: (state) => {
      state.errorMessages = {}
      state.asyncStatus = {}
    },
    addMissingErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages[action.payload] = "Required"
    },
    addErrorMessage: (state, action: PayloadAction<{ key: string, message: string }>) => {
      state.errorMessages[action.payload.key] = action.payload.message
    },
    resetSlice: () => {
      return initialState
    },
    resetNewStreamsState: (state) => {
      const keysToReset = ["newStreamsModalOpen", "newStreamsUrl"]
      keysToReset.forEach(key => {
        state[key] = initialState[key]
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        state.asyncStatus[getActionName(action)] = "pending"
      })
      .addMatcher(isRejected, (state, action) => {
        state.asyncStatus[getActionName(action)] = "rejected"
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.asyncStatus[getActionName(action)] = "fulfilled"
      })
  }
})

export const addStreams = createAsyncThunk(
  "media/addStreams",
  async (_payload, { dispatch }) => {
    const { newStreamsUrl } = store.getState().media
    try {
      const { website } = await MediaService.postMedia({ media_url: newStreamsUrl })
      await appDispatch(queryStreams())
      dispatch(
        mainActions.addNotification({
          content: `${_.capitalize(website)} media added`,
          type: "success",
        }),
      )
    } catch (e) {
      dispatch(mediaActions.addErrorMessage({
        key: "newStreams",
        message: getApiErrorMessage(e),
      }))
      throw new Error()
    }
  },
)

export const queryStreams = createAsyncThunk(
  "media/queryStreams",
  async (_payload, { dispatch }) => {
    const queryStreamsOut = await MediaService.getMediaQuery(undefined, 30, true)
    dispatch(mediaActions.updateSlice({ medias: queryStreamsOut.media, noMoreStreams: queryStreamsOut.no_more_media }))
    await sleep(100)
  }
)

// export const queryMoreAlbums = createAsyncThunk(
//   "album/queryMoreAlbums",
//   async (_payload, { dispatch }) => {
//     const { albums: curAlbums, noMoreAlbums } = store.getState().album
//     if (noMoreAlbums || !curAlbums) return
//     const lastId = curAlbums[curAlbums.length - 1].id
//     if (!lastId) return
//     const queryAlbumsOut = await AlbumService.getAlbumQuery(lastId, 30, true)
//     if (!queryAlbumsOut.albums || queryAlbumsOut.albums?.length === 0) {
//       dispatch(albumActions.updateSlice({ noMoreStreams: true }))
//     } else {
//       dispatch(albumActions.updateSlice({ albums: [...curAlbums, ...queryAlbumsOut.albums], noMoreStreams: queryAlbumsOut.no_more_albums }))
//     }
//   }
// )
//
// export const deleteAlbums = createAsyncThunk(
//   "album/deleteAlbums",
//   async (albumIds: Array<string>, { dispatch }) => {
//     await AlbumService.deleteAlbum({ album_ids: albumIds })
//     dispatch(
//       mainActions.addNotification({
//         content: "Albums deleted",
//         type: "success",
//       }),
//     )
//     let { albums } = store.getState().album
//     if (!albums) albums = []
//     dispatch(albumActions.updateSlice({ albums: albums.filter(a => !albumIds.includes(a.id!)) }))
//   }
// )

export const mediaReducer = mediaSlice.reducer
export const mediaActions = mediaSlice.actions
export const mediaSelector = (state: RootState) => state.media
