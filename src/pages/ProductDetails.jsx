import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img
        src={product.image}
        alt={product.name}
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h3>Brand</h3>
      <p>{product.brand}</p>

      <h3>Category</h3>
      <p>{product.category}</p>

      <h3>Price</h3>
      <p>₹ {product.price}</p>

      <h3>Stock</h3>
      <p>{product.stock}</p>

      <h3>Status</h3>
      <p>{product.status}</p>

      <h3>Rating</h3>
      <p>⭐ {product.rating}</p>
    </div>
  );
}

export default ProductDetails;