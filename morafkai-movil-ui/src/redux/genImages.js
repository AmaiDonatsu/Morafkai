import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image_data: '',
    loading: false
};

const generationSlice = createSlice({
    name: 'generation',
    initialState,
    reducers: {
        getNewImage(state, action) {
            state.image_data = action.payload;
            state.loading = false;
        },
        sendingRequest(state, action) {
            state.loading = action.payload;
        },
    }
});

export const { getNewImage, sendingRequest } = generationSlice.actions;
export default generationSlice.reducer;