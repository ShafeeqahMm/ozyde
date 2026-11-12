import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dresses from "../data/dresses";

function DressDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const dress = dresses.find((dress) => dress.id === Number(id));

  if (!dress) {
    return <h1>Dress not found</h1>;
  }

  return (
    <main className="dress-details">

      <div className="dress-gallery">

        <div className="thumbnail-list">
          {dress.images.map((image, index) => (
            <img
  key={image}
  src={image}
  alt={`${dress.name} view ${index + 1}`}
  onClick={() => setSelectedImage(index)}
  className={selectedImage === index ? "active-thumbnail" : ""}
/>
          ))}
        </div>

        <div className="main-dress-image">
          <img
            src={dress.images[selectedImage]}
            alt={dress.name}
          />
        </div>

      </div>

      <div className="dress-details-info">

        <p className="eyebrow">{dress.category}</p>

        <h1>{dress.name}</h1>

        <p className="dress-price">R{dress.price}</p>

        <p className="dress-description">
          {dress.description}
        </p>

        <div className="dress-sizes">
          <h3>Available Sizes</h3>

          <div className="size-options">
  {dress.sizes.map((size) => (
    <button
      key={size}
      type="button"
      className={selectedSize === size ? "selected-size" : ""}
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </button>
  ))}
</div>
        </div>

        <button
  className="rent-button"
  disabled={!selectedSize}
  onClick={() => {
    if (selectedSize) {
      navigate(`/rent/${dress.id}?size=${selectedSize}`);
    }
  }}
>
  Rent This Dress
</button>

        <div className="dress-extra-info">

  <div className="info-section">
    <h3>Care Instructions</h3>

    <ul>
      {dress.care.map((instruction) => (
        <li key={instruction}>{instruction}</li>
      ))}
    </ul>
  </div>

  <div className="info-section">
    <h3>Material</h3>

    <p>{dress.material}</p>
  </div>

</div>

      </div>

    </main>
  );
}

export default DressDetails;