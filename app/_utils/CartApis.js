const { default: axiosClient } = require("./axiosClient");
const addToCart = (payload) => axiosClient.post("/cards", payload);
const getUserCartItems = (email) =>
  axiosClient.get(
    `cards?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );
const deleteCartItem = (id) => axiosClient.delete(`/cards/${id}`);
export default { addToCart, getUserCartItems, deleteCartItem };
