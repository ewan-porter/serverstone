import { configureStore } from "@reduxjs/toolkit";

import { f1Api } from '../services/f1Api';

export default configureStore({
    reducer:{
        [f1Api.reducerPath]: f1Api.reducer,
    },
});