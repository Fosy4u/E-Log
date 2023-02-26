import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
	GLOBAL_FEATURE_KEY,
	globalReducer,
} from './global/global.slice'
import orgnisationsApi from './services/organisationsApi.slice'




const store = configureStore({
	reducer: {
		
		[orgnisationsApi.reducerPath]: orgnisationsApi.reducer,
		[GLOBAL_FEATURE_KEY]: globalReducer,
		
	},

	// Additional middleware can be passed to this array
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			
			orgnisationsApi.middleware
			
		]),
	devTools: process.env.NODE_ENV !== 'production',
	// Optional Redux store enhancers
	enhancers: []
})

setupListeners(store.dispatch)

export default store
