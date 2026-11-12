import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("ozydeCart")) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.cartId !== itemId);

    setCart(updatedCart);
    localStorage.setItem("ozydeCart", JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <p className="eyebrow">YOUR CART</p>
          <h1>Your cart is empty.</h1>
          <p>
            Browse our collection and find something for your next occasion.
          </p>

          <button
            className="cart-shop-button"
            onClick={() => navigate("/dresses")}
          >
            Browse Dresses
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <p className="eyebrow">YOUR CART</p>
        <h1>Your rental.</h1>
      </div>

      <section className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.cartId}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <p className="eyebrow">{item.category}</p>
                <h2>{item.name}</h2>

                <p>Size: {item.size}</p>

                <p>
                  Rental: {item.startDate} – {item.returnDate}
                </p>

                <strong>R{item.price}</strong>

                <button
                  className="remove-cart-button"
                  onClick={() => removeItem(item.cartId)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Rental</span>
            <strong>
              R
              {cart.reduce(
                (total, item) => total + item.price,
                0
              )}
            </strong>
          </div>

          <div className="summary-row">
            <span>Rental period</span>
            <strong>3 days</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </aside>
      </section>
    </main>
  );
}

export default Cart;