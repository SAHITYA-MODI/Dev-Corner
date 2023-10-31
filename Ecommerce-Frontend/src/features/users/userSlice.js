import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk(
  "user/cart/get",
  async (data, thunkAPI) => {
    try {
      return await authService.getCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyCart = createAsyncThunk(
  "user/cart/delete",
  async (data, thunkAPI) => {
    try {
      return await authService.emptyCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "user/cart/product/delete",
  async (data, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductQuantityFromCart = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProductQuantityFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "user/order/get",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/profile/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassToken = createAsyncThunk(
  "user/forget/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/password/reset",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User Logged In Successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (isSuccess === true) {
          toast.success("Product added to cart");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product removed from cart Successfully");
        }
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(updateProductQuantityFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductQuantityFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product updated from cart Successfully");
        }
      })
      .addCase(updateProductQuantityFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProducts = action.payload;
        if (state.isSuccess) {
          toast.success("Ordered Successfully");
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOrderedProducts = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        let currentUserData = JSON.parse(localStorage.getItem("customer"));
        let newUserData = {
          _id: currentUserData?._id,
          token: currentUserData?.token,
          firstname: action?.payload?.firstname,
          lastname: action?.payload?.lastname,
          email: action?.payload?.email,
          mobile: action?.payload?.mobile,
        };
        localStorage.setItem("customer", JSON.stringify(newUserData));
        state.user = newUserData;
        toast.success("Profile Updated Successfully");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(forgotPassToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess) {
          toast.success("Forgot Password Email Sent Successfully");
        }
      })
      .addCase(forgotPassToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          toast.success("Password Updated Successfully");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCart = action.payload;
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
