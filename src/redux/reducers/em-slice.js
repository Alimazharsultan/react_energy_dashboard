import { createSlice } from "@reduxjs/toolkit";

const emSlice = createSlice({
  name: "EM",
  initialState: {
    i1: "",
    i2: "",
    i3: "",
    v1: "",
    v2: "",
    v3: "",
    apP1: "",
    apP2: "",
    apP3: "",
    acP1: "",
    acP2: "",
    acP3: "",
    rP1: "",
    rP2: "",
    rP3: "",
    pf1: "",
    pf2: "",
    pf3: "",
    pa1: "",
    pa2: "",
    pa3: "",
    freq: "",
    temp: "",
    instEn1: "",
    instEn2: "",
    instEn3: "",
    hrEn1: "",
    hrEn2: "",
    hrEn3: "",
    dayEn1: "",
    dayEn2: "",
    dayEn3: "",
    dateTimeData:[],
    p1Data : [],
    p2Data : [],
    p3Data : [],
    h1Data : [],
    h1DateTime : []
  },
  reducers: {
    setValues(state,action){
        const values = action.payload;
        state.i1= values.i1
        state.i2= values.i2;
        state.i3= values.i3;
        state.v1= values.v1;
        state.v2= values.v2;
        state.v3= values.v3;
        state.apP1= values.apP1;
        state.apP2= values.apP2;
        state.apP3= values.apP3;
        state.acP1= values.acP1;
        state.acP2= values.acP2;
        state.acP3= values.acP3;
        state.rP1= values.rP1;
        state.rP2= values.rP2;
        state.rP3= values.rP3;
        state.pf1= values.pf1;
        state.pf2= values.pf2;
        state.pf3= values.pf3;
        state.pa1= values.pa1;
        state.pa2= values.pa2;
        state.pa3= values.pa3;
        state.freq= values.freq;
        state.temp= values.temp;
        state.instEn1= values.instEn1;
        state.instEn2= values.instEn2;
        state.instEn3= values.instEn3;
        state.hrEn1= values.hrEn1;
        state.hrEn2= values.hrEn2;
        state.hrEn3= values.hrEn3;
        state.dayEn1= values.dayEn1;
        state.dayEn2= values.dayEn2;
        state.dayEn3= values.dayEn3;
    },
    setP1Data(state,action){
      state.p1Data = action.payload;
    },
    setP2Data(state,action){
      state.p2Data = action.payload;
    },
    setP3Data(state,action){
      state.p3Data = action.payload;
    },
    setDateTimeData(state,action){
      state.dateTimeData = action.payload;
    },
    seth1DateTime(state, action){
      state.h1DateTime = action.payload;
    },
    seth1Data(state, action){
      state.h1Data = action.payload;
    },

  },
});


export const emActions = emSlice.actions;

export default emSlice;
