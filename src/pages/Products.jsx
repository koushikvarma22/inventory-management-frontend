import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);

      setProducts(
        products.filter(
          (product) => product.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Search + Category + Stock Filter
  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      product.category === category;

    const stockMatch =
      stock === "All" ||
      product.status === stock;

    return (
      searchMatch &&
      categoryMatch &&
      stockMatch
    );
  });

  // Sort
  let finalProducts = [...filteredProducts];

  if (sort === "high") {
    finalProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "low") {
    finalProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  return (
    <>
      <h1>Available Products</h1>

      <Link
        to="/add-product"
        className="add-btn"
      >
        Add Product
      </Link>

      <br />
      <br />

      <input
        type="text"
        className="search-box"
        placeholder="Search Product"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="All">All Categories</option>
        <option value="Electronics">
          Electronics
        </option>
        <option value="Furniture">
          Furniture
        </option>
        <option value="Kitchen">
          Kitchen
        </option>
        <option value="Sports">
          Sports
        </option>
      </select>

      <select
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
      >
        <option value="All">All Stock</option>
        <option value="In Stock">
          In Stock
        </option>
        <option value="Low Stock">
          Low Stock
        </option>
        <option value="Out of Stock">
          Out of Stock
        </option>
      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
      >
        <option value="">
          Sort By Price
        </option>

        <option value="high">
          High To Low
        </option>

        <option value="low">
          Low To High
        </option>
      </select>

      <br />
      <br />

      {finalProducts.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <div className="products">
          {finalProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Products;