const FAVOURITES_KEY = 'favourites';
const CART_KEY = 'cart';
export const SHOP_DATA_EVENT = 'shop-data-updated';

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(SHOP_DATA_EVENT));
};

export const getFavouriteIds = () => readJSON(FAVOURITES_KEY, []);

export const isFavourite = (productId) => getFavouriteIds().includes(productId);

export const toggleFavourite = (productId) => {
  const favourites = getFavouriteIds();
  const exists = favourites.includes(productId);
  const updated = exists
    ? favourites.filter((id) => id !== productId)
    : [...favourites, productId];

  writeJSON(FAVOURITES_KEY, updated);
  return !exists;
};

export const getCartItems = () => readJSON(CART_KEY, []);

export const getCartQuantity = (productId) => {
  const item = getCartItems().find((entry) => entry.id === productId);
  return item ? item.quantity : 0;
};

export const addToCart = (productId, quantity = 1) => {
  const cartItems = getCartItems();
  const index = cartItems.findIndex((item) => item.id === productId);

  if (index >= 0) {
    cartItems[index] = {
      ...cartItems[index],
      quantity: cartItems[index].quantity + quantity,
    };
  } else {
    cartItems.push({ id: productId, quantity });
  }

  writeJSON(CART_KEY, cartItems);
};

export const setCartQuantity = (productId, quantity) => {
  const cartItems = getCartItems();

  if (quantity <= 0) {
    writeJSON(
      CART_KEY,
      cartItems.filter((item) => item.id !== productId)
    );
    return;
  }

  const index = cartItems.findIndex((item) => item.id === productId);
  if (index >= 0) {
    cartItems[index] = { ...cartItems[index], quantity };
  } else {
    cartItems.push({ id: productId, quantity });
  }

  writeJSON(CART_KEY, cartItems);
};

export const removeFromCart = (productId) => {
  const cartItems = getCartItems().filter((item) => item.id !== productId);
  writeJSON(CART_KEY, cartItems);
};

export const clearCart = () => {
  writeJSON(CART_KEY, []);
};

export const getCartCount = () =>
  getCartItems().reduce((sum, item) => sum + item.quantity, 0);