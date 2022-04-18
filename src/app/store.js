import { configureStore } from "@reduxjs/toolkit";

import { f1Api } from '../services/f1Api';
import { f1NewsApi } from "../services/f1NewsApi";

export default configureStore({
    reducer:{
        [f1Api.reducerPath]: f1Api.reducer,
        [f1NewsApi.reducerPath]: f1NewsApi.reducer,
    },
});