import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from "@/services/axiosService.js";
import Constants from "@/Constants";

export const fetchCategories = createAsyncThunk('fetchCategories', async (input) => {

  try {
      const response =  await axiosInstance.post(`${Constants.BASE_URL}/categories`, input)
      console.log(response);
      
      if (response?.status == 200) {
        return response.data
      }
    } catch (error) {
      console.log(error);
      
    }
  
  
});

const initialState = {
  categories: null,
  isLoading: false,
  value: 'asdfadsf',
}

export const Category = createSlice({
  name: 'category',
  initialState,
  reducers: {
   getCategory: (state, action) => {
      state.value = 'ddsfsdf';
      console.log();
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading  = false;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.log('Error:', action.error.message);
      state.isLoading = false;
    });
  }
})

export const { getCategory } = Category.actions;

export default Category.reducer