// src/Cafe.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store";
import './Cafe.css';

function Cafe() {
  const cafeItems = useSelector((state) => state.products.Cafe || []);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(cafeItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = cafeItems.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="cafe-page">
      <h2 className="section-title">☕ Cafe Items</h2>

      <div className="cafe-grid">
        {paginatedItems.map((item, index) => (
          <div key={index} className="cafe-card">
            <img src={item.image} alt={item.name} className="cafe-image" />
            <h3 className="cafe-name">{item.name}</h3>
            <p className="cafe-price">₹{item.Price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => dispatch(addToCart(item))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={currentPage === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Cafe;
