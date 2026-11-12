export function getCart() {
  return JSON.parse(localStorage.getItem("ozydeCart")) || [];
}

export function saveCart(cart) {
  localStorage.setItem("ozydeCart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}