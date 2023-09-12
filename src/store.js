import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState : "홍길동"
})

export default configureStore({
  reducer :{
    user : user.reducer
  }
})