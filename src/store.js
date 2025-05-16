import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
let localStorageCard = [];
try {
  const savedCart = localStorage.getItem('cart');
  if (savedCart && savedCart !== "undefined") {
    localStorageCard = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn('Failed to parse cart from localStorage:', e);
  localStorageCard = [];
}
// Load orders from localStorage
const savedOrders = localStorage.getItem('orders');
const localStorageOrders = savedOrders ? JSON.parse(savedOrders) : [];


// Product Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
      { name: 'Tomato', Price: 49.0, image: 'images/Tomato.jpg' },
      { name: 'potato', Price: 120.0, image: 'images/potato.jpg' },
      { name: 'spinach', Price: 50.0, image: 'images/spinach.jpg' },
      { name: 'carrot', Price: 150.0, image: 'images/carrot.jpg' },
      { name: 'cabbage', Price: 200.0, image: 'images/cabbage.jpg' },
      { name: 'cauliflower', Price: 100.0, image: 'images/cauliflower.jpg' },
      { name: 'coriander', Price: 59.0, image: 'images/coriander.jpg' },
      { name: 'onions', Price: 69.0, image: 'images/onions.jpg' },
      { name: 'drumsticks', Price: 99.0, image: 'images/drumsticks.jpg' },
      { name: 'broccoli', Price: 100.0, image: 'images/broccoli.jpg' }
    ],
    Nonveg: [
      { name: 'Chicken', Price: 500.0, image: 'images/chicken.jpg' },
      { name: 'drumsticks', Price: 200.0, image: 'images/drumsticks1.jpg' },
      { name: 'Fish', Price: 300.0, image: 'images/fish.jpg' },
      { name: 'Prawns', Price: 899.0, image: 'images/prawns.jpg' },
      { name: 'pork', Price: 299.0, image: 'images/pork.jpg' },
      { name: 'Crab', Price: 500.0, image: 'images/crab.jpg' },
      { name: 'Duck', Price: 500.0, image: 'images/duck.jpg' }
    ],
    Mobiles: [
      { name: 'iPhone', Price: 79999.0, image: 'images/iphone.jpg' },
      { name: 'Samsung Galaxy', Price: 59999.0, image: 'images/samsung.jpg' },
      { name: 'Redmi', Price: 18999.0, image: 'images/redmi.jpg' },
      { name: 'Realme Narzo 60', Price: 16999.0, image: 'images/mobiles/narzo60.jpg' },
      { name: 'Google Pixel', Price: 59999.0, image: 'images/google.jpg' },
      { name: 'OnePlus 11R', Price: 39999.0, image: 'images/oneplus.jpg' },
      { name: 'Oppo', Price: 29999.0, image: 'images/oppo.jpg' },
      { name: 'Nokia', Price: 15999.0, image: 'images/nokia.jpg' },
      { name: 'Techno', Price: 19999.0, image: 'images/techno.jpg' },
      { name: 'Vivo', Price: 46999.0, image: 'images/vivo.jpg' }
    ],
    Cafe: [
      { name: 'Panner Puff', Price: 29.0, image: 'images/panner puff.jpg' },
      { name: 'Chicken Puff', Price: 29.0, image: 'images/chicken puff.jpg' },
      { name: 'Veg Puff', Price: 179.0, image: 'images/veg puff.jpg' },
      { name: 'Egg Puff', Price: 179.0, image: 'images/egg puff.jpg' },
      { name: 'ChocoCream Cake', Price: 449.0, image: 'images/choco cream cake.jpg' },
      { name: 'Strawberry', Price: 129.0, image: 'images/strawberry.jpg' },
      { name: 'KitKat Cake', Price: 599.0, image: 'images/kitkat cake.jpg' },
      { name: 'Italian Sandwich', Price: 599.0, image: 'images/italian sandwich.jpg' },
      { name: 'Sandwich', Price: 99.0, image: 'images/sandwich.jpg' }
    ],
    Electronics: [
      { name: 'AC', Price: 54999.0, image: 'images/ac.jpg' },
      { name: 'Cooler', Price: 16999.0, image: 'images/cooler.jpg' },
      { name: 'Cooker', Price: 4999.0, image: 'images/cooker.jpg' },
      { name: 'Washing Machine', Price: 42999.0, image: 'images/washingmachine.jpg' },
      { name: 'Stove', Price: 12999.0, image: 'images/stove.jpg' },
      { name: 'Mixi', Price: 3999.0, image: 'images/mixi.jpg' },
      { name: 'MicroOven', Price: 19999.0, image: 'images/microoven.jpg' },
      { name: 'Kettle', Price: 599.0, image: 'images/kettle.jpg' },
      { name: 'IronBox', Price: 2599.0, image: 'images/ironbox.jpg' },
      { name: 'Fridge', Price: 59999.0, image: 'images/fridge.jpg' }
    ],
    Toys: [
      { name: 'Dinosaur', Price: 999.0, image: 'images/dino.jpg' },
      { name: 'Baby Doll', Price: 599.0, image: 'images/baby.jpg' },
      { name: 'Battery Jeep', Price: 1299.0, image: 'images/batteryjeep.jpg' },
      { name: 'Car', Price: 799.0, image: 'images/car.jpg' },
      { name: 'Teddy', Price: 199.0, image: 'images/teddy.jpg' },
      { name: 'Robo', Price: 999.0, image: 'images/robo.jpg' },
      { name: 'Rabbit', Price: 99.0, image: 'images/rabbit.jpg' },
      { name: 'Jeep', Price: 1799.0, image: 'images/jeep.jpg' },
      { name: 'JCB', Price: 1599.0, image: 'images/jcb.jpg' },
      { name: 'Dog', Price: 599.0, image: 'images/dog.jpg' }
    ]
  },
  reducers: {}
});

// Cart Slice
const cartslice = createSlice({
  name: 'cart',
  initialState:localStorageCard ,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    IncCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    DecCart: (state, action) => {
      return state.map((item) =>
        item.name === action.payload.name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
    },
    RemoveFromCart: (state, action) => {
      return state.filter(item => item.name !== action.payload.name);
    },
    ClearCart: () => []
  }
});

// Orders Slice ✅
const ordersSlice = createSlice({
  name: 'orders',
  initialState: localStorageOrders,
  reducers: {
    AddOrder: (state, action) => {
      state.push({
        id: Date.now(),
        items: action.payload.items,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    },
  }
});

// Export Actions
export const { addToCart, IncCart, DecCart, RemoveFromCart, ClearCart } = cartslice.actions;
export const { AddOrder } = ordersSlice.actions;

// // Configure Store
// const store = configureStore({
//   reducer: {
//     products: productSlice.reducer,
//     cart: cartslice.reducer,
//     orders: ordersSlice.reducer // ✅ added orders slice
//   }
// });



// --- Cart slice here (if already present) ---

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignedIn: localStorage.getItem("isSignedIn") === "true",
    email: localStorage.getItem("userEmail") || "",
  },
  reducers: {
    login: (state, action) => {
      state.isSignedIn = true;
      state.email = action.payload.email;
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("userEmail", action.payload.email);
    },
    logout: (state) => {
      state.isSignedIn = false;
      state.email = "";
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("userEmail");
    },
  },
});

export const isSignedIn = (state) => state.user.isSignedIn;

export const { login, logout } = userSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    user: userSlice.reducer,
    cart: cartslice.reducer,
    orders: ordersSlice.reducer // ✅ added orders slice
  }
});
// Persist cart to localStorage on every update
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('orders', JSON.stringify(state.orders));

});
export default store;
