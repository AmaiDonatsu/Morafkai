import { configureStore } from "@reduxjs/toolkit";
import generationReducer from "../redux/genImages";

const store = configureStore({
    reducer: {
        generation: generationReducer,
    },
});

export default store;
