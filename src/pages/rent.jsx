import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import dresses from "../data/dresses";
import { saveCart, getCart } from "../utils/cart";
function Rent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
const selectedSize = searchParams.get("size");

const dress = dresses.find((dress) => dress.id === Number(id));

  const [selectedStart, setSelectedStart] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  // The month currently being displayed.
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 28)
  );

  // Temporary existing bookings.
  // We'll eventually get these from Supabase.
  const existingBookings = [
    {
      start: new Date(2026, 8, 8),
      end: new Date(2026, 8, 10),
    },
    {
      start: new Date(2026, 8, 17),
      end: new Date(2026, 8, 19),
    },
    {
      start: new Date(2026, 8, 24),
      end: new Date(2026, 8, 26),
    },
  ];

  const today = new Date(2026, 8, 28);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isBeforeToday = (date) => {
    const checkDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return checkDate < todayDate;
  };

  const isUnavailable = (date) => {
    return existingBookings.some((booking) => {
      const bookingStart = new Date(
        booking.start.getFullYear(),
        booking.start.getMonth(),
        booking.start.getDate()
      );

      const bookingEnd = new Date(
        booking.end.getFullYear(),
        booking.end.getMonth(),
        booking.end.getDate() + 1
      );

      return date >= bookingStart && date < bookingEnd;
    });
  };

  const canStartRental = (startDate) => {
    for (let i = 0; i < 4; i++) {
      const checkDate = new Date(startDate);
      checkDate.setDate(startDate.getDate() + i);

      if (isBeforeToday(checkDate)) {
        return false;
      }

      if (isUnavailable(checkDate)) {
        return false;
      }
    }

    return true;
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(year, month, day);

    if (!canStartRental(selectedDate)) {
      return;
    }

    setSelectedStart(selectedDate);
  };

  const isSelected = (day) => {
    if (!selectedStart) {
      return false;
    }

    const date = new Date(year, month, day);

    const rentalEnd = new Date(selectedStart);
    rentalEnd.setDate(selectedStart.getDate() + 2);

    return date >= selectedStart && date <= rentalEnd;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedStart(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedStart(null);
  };

  const calendarCells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(
      <div
        key={`empty-${i}`}
        className="calendar-empty"
      ></div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    const past = isBeforeToday(date);
    const unavailable = isUnavailable(date);
    const selected = isSelected(day);

    calendarCells.push(
      <button
        key={day}
        type="button"
        className={`calendar-day ${
          past ? "past" : ""
        } ${unavailable ? "unavailable" : ""} ${
          selected ? "selected" : ""
        }`}
        disabled={past || unavailable}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </button>
    );
  }

  return (
    <main className="rent-page">

      <div className="rent-header">
        <p className="eyebrow">RENT THIS DRESS</p>

        <h1>Select your rental dates</h1>

        <p>
          Rentals are for 3 days. Select an available start
          date to choose your rental period.
        </p>
      </div>

      <section className="booking-container">

        <div className="calendar-section">

          <div className="calendar-top">

            <button
              type="button"
              className="month-arrow"
              onClick={goToPreviousMonth}
            >
              ‹
            </button>

            <h2>
              {monthName} {year}
            </h2>

            <button
              type="button"
              className="month-arrow"
              onClick={goToNextMonth}
            >
              ›
            </button>

          </div>

          <div className="calendar-weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-days">
            {calendarCells}
          </div>

          <div className="calendar-legend">

            <div className="legend-item">
              <span className="legend-box available-box"></span>
              <span>Available</span>
            </div>

            <div className="legend-item">
              <span className="legend-box unavailable-box"></span>
              <span>Unavailable</span>
            </div>

            <div className="legend-item">
              <span className="legend-box selected-box"></span>
              <span>Your rental</span>
            </div>

          </div>

        </div>

        <aside className="booking-summary">

          <h2>Rental Summary</h2>

          <div className="summary-row">
            <span>Rental period</span>
            <strong>3 days</strong>
          </div>

          <div className="summary-row">

            <span>Start date</span>

            <strong>
              {selectedStart
                ? selectedStart.toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "Select a date"}
            </strong>

          </div>

          <div className="summary-row">

            <span>Return date</span>

            <strong>
              {selectedStart
                ? (() => {
                    const returnDate = new Date(selectedStart);
                    returnDate.setDate(
                      selectedStart.getDate() + 2
                    );

                    return returnDate.toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    );
                  })()
                : "Select a date"}
            </strong>

          </div>

          <button
  type="button"
  className="add-cart-button"
  disabled={!selectedStart}
  onClick={() => {
  if (selectedStart) {
    const returnDate = new Date(selectedStart);
    returnDate.setDate(selectedStart.getDate() + 2);

    const newItem = {
      cartId: `${dress.id}-${selectedStart.getTime()}`,
      id: dress.id,
      name: dress.name,
      category: dress.category,
      price: dress.price,
      image: dress.images[0],
      size: selectedSize,
      startDate: selectedStart.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      returnDate: returnDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    const existingCart = getCart();

const updatedCart = [...existingCart, newItem];

saveCart(updatedCart);

    setShowCartModal(true);
  }
}}
>
  Add to Cart
</button>

        </aside>

      </section>

{showCartModal && (
  <div className="cart-modal-overlay">
    <div className="cart-modal">
      <button
        className="cart-modal-close"
        onClick={() => setShowCartModal(false)}
      >
        ×
      </button>

      <div className="cart-modal-icon">✓</div>

      <p className="eyebrow">ADDED TO CART</p>

      <h2>{dress.name}</h2>

      <p>
        Your 3-day rental has been added to your cart.
      </p>

      <div className="cart-modal-actions">
        <button
          className="continue-shopping-button"
          onClick={() => setShowCartModal(false)}
        >
          Continue Shopping
        </button>

        <button
          className="view-cart-button"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}

export default Rent;