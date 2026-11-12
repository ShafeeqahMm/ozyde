import { useNavigate } from "react-router-dom";

const dresses = [
  {
    id: 1,
    name: "The Amara Dress",
    category: "Evening",
    price: "R650",
  },
  {
    id: 2,
    name: "The Zuri Dress",
    category: "Wedding Guest",
    price: "R750",
  },
  {
    id: 3,
    name: "The Nia Dress",
    category: "Formal",
    price: "R700",
  },
];

function Dresses() {
  const navigate = useNavigate();

  return (
    <main className="dresses-page">
      <section className="dresses-header">
        <p className="eyebrow">THE COLLECTION</p>

        <h1>Find your dress.</h1>

        <p>
          Explore our collection of dresses available for your next special
          occasion.
        </p>
      </section>

      <section className="dress-grid">
        {dresses.map((dress) => (
          <article
            className="dress-card"
            key={dress.id}
            onClick={() => navigate(`/dresses/${dress.id}`)}
          >
            <div className="dress-image">
              <span>Image</span>
            </div>

            <div className="dress-info">
              <div>
                <h2>{dress.name}</h2>
                <p>{dress.category}</p>
              </div>

              <strong>{dress.price}</strong>
            </div>

            <button
              className="view-button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/dresses/${dress.id}`);
              }}
            >
              View Dress
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Dresses;