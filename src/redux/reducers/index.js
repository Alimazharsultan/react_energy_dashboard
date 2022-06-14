import ThemeReducer from "./ThemeReducer"
import { combineReducers } from "redux"
import emSlice from "./em-slice";

const rootReducer = combineReducers({ThemeReducer,EM:emSlice.reducer})

export default rootReducer