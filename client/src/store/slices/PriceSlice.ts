import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ICatalogCategory, ICatalogProduct, IPriceListPayload} from '../../models/BaseItems';

interface PriceState {
	loading: boolean;
	error: boolean;
	success: boolean;
	page: number;
	pages: number;
	limit: number;
	catalogCategories: ICatalogCategory[];
	catalogProducts: ICatalogProduct[];    // ?? //
	currentCatalogCategory: ICatalogCategory;
}

const initialState: PriceState = {
	loading: false,
	error: false,
	success: false,
	catalogCategories: [],
	catalogProducts: [],
	currentCatalogCategory: { id: 0, name: '', img: '' },
	page: 1,
	pages: 1,
	limit: 10,
};

export const priceSlice = createSlice({
	name: 'price',
	initialState,
	reducers: {
		loading(state) {
			state.loading = true;
			state.error = false;
		},
		error(state) {
			state.loading = false;
			state.error = true;
		},
		success(state) {
			state.loading = false;
			state.success = true;
		},
		fetchingCatalogCategories(state) {
			state.loading = true;
		},
		updateCatalogCategory(state, action: PayloadAction<ICatalogCategory>) {
			const { id, name, img } = action.payload;
			const category = state.catalogCategories.find((category) => category.id === id);
			if (category) {
				category.name = name;
				category.img = img;
			}
		},
		updateCatalogProduct(state, action: PayloadAction<ICatalogProduct>) {
			const { id, name} = action.payload;
			const vehicle = state.catalogProducts.find((vehicle) => vehicle.id === id);
			if (vehicle) {
				vehicle.name = name;
			}
		},
		fetchingCatalogCategoriesSuccess(state, action: PayloadAction<IPriceListPayload>) {
			state.loading = false;
			state.catalogCategories = action.payload.categories;
			state.catalogProducts = action.payload.items;
		},
		fetchingCatalogProductsSuccess(state, action: PayloadAction<IPriceListPayload>) {
			state.loading = false;
			state.catalogCategories = action.payload.categories;
			state.catalogProducts = action.payload.items;
		},
		setCurrentCatalogCategory(state, action: PayloadAction<ICatalogCategory>) {
			state.loading = false;
			state.currentCatalogCategory = action.payload;
		},
		setDefaultCatalogCategory(state) {
			state.loading = false;
			state.currentCatalogCategory = { id: 0, name: '', img: '' };
		},
		setPages(state, action: PayloadAction<number>) {
			state.pages = Math.floor(action.payload / state.limit + 1);
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
	},
});
export default priceSlice.reducer;
