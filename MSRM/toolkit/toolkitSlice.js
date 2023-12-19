import { createSlice } from '@reduxjs/toolkit';
import sampleMock from '../mock/mock';

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        samples: [],
        sample: sampleMock,
    },
    reducers: {
        setSamples: (state, { payload }) => {
            console.log('setSamples');
            state.samples = payload;
        },
        setSample: (state, { payload }) => {
            console.log('setSample');
            state.sample = payload;
        },
        resetSample: (state) => {
            console.log('resetSample');
            state.sample = sampleMock;
        },
    }
})

export default toolkitSlice.reducer;

export const { setSamples, setSample, resetSample } = toolkitSlice.actions;
