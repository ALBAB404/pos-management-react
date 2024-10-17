import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: {},
}

export const Category = createSlice({
  name: 'category',
  initialState,
  reducers: {
   getCategory: () => {
      state.value = action.payload;
    },
  },
})

export const { getCategory } = Category.actions;

export default Category.reducer