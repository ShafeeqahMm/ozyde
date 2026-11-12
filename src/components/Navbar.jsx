import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("ozydeCart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
  let mounted = true;

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (mounted) {
      setUser(session?.user ?? null);
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);


  return (
    <header className="navbar">
      <Link to="/" className="logo">
        OZYDE 
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/dresses">Dresses</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="nav-actions">
  {user ? (
    <>
      <span className="nav-account">My Account</span>

      <button
        className="nav-button"
        onClick={async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
            alert("Unable to sign out. Please try again.");
          }
        }}
      >
        Sign Out
      </button>
    </>
  ) : (
    <Link to="/login" className="nav-button">
      Sign In
    </Link>
  )}

  <Link to="/cart" className="cart-button">
    Cart ({cartCount})
  </Link>
</div>
    </header>
  );
}

export default Navbar;