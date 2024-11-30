import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const your_url = "abcd";

const initialState = {
  users: {},
  currentUserId: null,
  loading: false,
  error: null,
  products: [],
  cart: [],
  addresses: [],
  currentOrderId: null,
  orders: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCurrentOrder(state, action) {
      state.currentOrderId = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    clearCart(state) {
      state.cart=[]
    }
  },
});

export const {
  setLoading,
  setError,
  setCurrentOrder,
  setProducts,
  setProductDetails,
  setAddresses,
  setCart,
  setOrders,
  clearCart,
} = userSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/products.json`);
    const data = response.data || {};

    const products = Object.entries(data).flatMap(([category, categoryProducts]) =>
      Object.entries(categoryProducts).map(([id, product]) => ({
        id,
        category,
        ...product,
      }))
    );

    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(`Error fetching products: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export const fetchCategoryProducts = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/products/${category}.json`);
    const data = response.data || {};

    const products = Object.entries(data).map(([id, product]) => ({
      id,
      category,
      ...product,
    }));

    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(`Error fetching category products: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export const fetchProductDetails = (category, id) => async (dispatch) => {
  try {
    const response = await axios.get(`${your_url}/products/${category}/${id}.json`);
    const data = response.data;

    const productDetails = {
      id,
      category,
      ...data,
    };

    dispatch(setProductDetails(productDetails));
  } catch (error) {
    dispatch(setError(`Error fetching product details: ${error.message}`));
  }
};

export const fetchCart = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/cart/${username}.json`);
    const data = response.data || [];
    dispatch(setCart(data));
  } catch (error) {
    dispatch(setError(`Error fetching cart: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export const addToCart = (username, product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const cartResponse = await axios.get(`${your_url}/cart/${username}.json`);
    const cart = cartResponse.data || [];

    const productResponse = await axios.get(`${your_url}/products/${product.Category}/${product.id}.json`);
    const productData = productResponse.data;

    if (productData.Quantity <= 0) {
      dispatch(setError('Product is out of stock'));
      return;
    }

    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].Quantity += 1;

      await axios.put(`${your_url}/products/${product.Category}/${product.id}.json`, {
        ...productData,
        Quantity: productData.Quantity - 1,
      });

      await axios.put(`${your_url}/cart/${username}.json`, updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, Quantity: 1 }];

      await axios.put(`${your_url}/products/${product.Category}/${product.id}.json`, {
        ...productData,
        Quantity: productData.Quantity - 1,
      });

      await axios.put(`${your_url}/cart/${username}.json`, updatedCart);
    }

    dispatch(fetchCart(username));
  } catch (error) {
    dispatch(setError(`Error adding to cart: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export const removeFromCart = (username, productId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/cart/${username}.json`);
    const cart = response.data || [];

    const productInCart = cart.find((item) => item.id === productId);
    if (!productInCart) {
      dispatch(setError('Product not found in the cart'));
      return;
    }

    const updatedCart = cart.filter((item) => item.id !== productId);

    const productResponse = await axios.get(`${your_url}/products/${productInCart.Category}/${productId}.json`);
    const productData = productResponse.data;

    const updatedProductData = {
      ...productData,
      Quantity: productData.Quantity + productInCart.Quantity,
    };

    await axios.put(`${your_url}/products/${productInCart.Category}/${productId}.json`, updatedProductData);
    await axios.put(`${your_url}/cart/${username}.json`, updatedCart);

    dispatch(fetchCart(username));
  } catch (error) {
    dispatch(setError(`Error removing from cart: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export const fetchAllAddresses = (Username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/users/${Username}/addresses.json`);
    const data = response.data || {};

    const addresses = Object.entries(data).map(([addressId, address]) => ({
      id: addressId,
      ...address,
    }));

    dispatch(setAddresses(addresses));
  } catch (error) {
    dispatch(setError(`Error fetching addresses: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export const addNewAddress = (username, address) => async (dispatch) => {
  try {
    await axios.post(`${your_url}/users/${username}/addresses.json`, address);
    dispatch(fetchAllAddresses(username));
  } catch (error) {
    console.error('Error adding address:', error);
  }
};

export const placeOrder = (userId, orderData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const orderId = orderData.id;
    console.log(`${your_url}/orders/${userId}/${orderId}.json`);

    const data = await axios.post(`${your_url}/orders/${userId}.json`, { ...orderData, id: orderId });
    console.log(data.data);

    dispatch(setCurrentOrder(orderId));

    const orders = Object.entries(data).map(([orderId, order]) => ({
      id: orderId,
      ...order,
    }));
    dispatch(setOrders(orders));

    await axios.put(`${your_url}/cart/${userId}.json`, []);

    dispatch(clearCart());
  } catch (error) {
    dispatch(setError(`Error placing order: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};


export const fetchOrders = (username) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(`${your_url}/orders/${username}.json`);
    const data = response.data || {};
    console.log(data)
    const orders = Object.entries(data).map(([orderId, order]) => ({
      id: orderId,
      ...order,
    }));

    console.log(orders)
    dispatch(setOrders(orders));
  } catch (error) {
    dispatch(setError(`Error fetching orders: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
    dispatch(setError(null));
  }
};

export default userSlice.reducer;
