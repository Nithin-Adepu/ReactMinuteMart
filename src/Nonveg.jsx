import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './nonveg.css';

function Nonveg() {
  const nonvegItems = useSelector((state) => state.products.Nonveg || []);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(1000);
  const itemsPerPage = 4;

  const priceRanges = [
    { label: '₹0 – ₹100', min: 0, max: 100 },
    { label: '₹101 – ₹200', min: 101, max: 200 },
    { label: '₹201 – ₹300', min: 201, max: 300 },
    { label: '₹301 – ₹500', min: 301, max: 500 },
    { label: '₹501+', min: 501, max: Infinity },
  ];

  const handleRangeCheckboxChange = (label) => {
    setSelectedRanges((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedRanges([]);
    setSliderMin(0);
    setSliderMax(1000);
  };

  const filteredItems = nonvegItems.filter((item) => {
    const price = parseFloat(item.Price);

    const matchesCheckbox =
      selectedRanges.length === 0 ||
      selectedRanges.some((label) => {
        const range = priceRanges.find((r) => r.label === label);
        return price >= range.min && price <= range.max;
      });

    const matchesSlider = price >= sliderMin && price <= sliderMax;

    return matchesCheckbox && matchesSlider;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="nonveg-page">
      <h2 className="section-title">🍗 Non-Veg Delights</h2>

      {/* Price Filter Controls */}
      <div className="price-controls">
        <h4>Filter by Price Range:</h4>
        <div className="price-checkboxes">
          {priceRanges.map((range, index) => (
            <label key={index} className="price-option">
              <input
                type="checkbox"
                value={range.label}
                checked={selectedRanges.includes(range.label)}
                onChange={() => handleRangeCheckboxChange(range.label)}
              />
              {range.label}
            </label>
          ))}
        </div>
        <button className="clear-button" onClick={handleClearFilters}>
          Clear Filters
        </button>

        {/* Price Slider */}
        <div className="slider-container">
          <label>
            Min: ₹{sliderMin}
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={sliderMin}
              onChange={(e) => setSliderMin(Number(e.target.value))}
            />
          </label>
          <label>
            Max: ₹{sliderMax}
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={sliderMax}
              onChange={(e) => setSliderMax(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      {/* Products Grid */}
      <div className="nonveg-grid">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <div key={index} className="nonveg-card">
              <img src={item.image} alt={item.name} className="nonveg-image" />
              <h3 className="nonveg-name">{item.name}</h3>
              <p className="nonveg-price">₹{item.Price}/KG</p>
              <button
                className="add-to-cart-btn"
                onClick={() => dispatch(addToCart(item))}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No items found in this price range.</p>
        )}
      </div>

      {/* Pagination */}
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

export default Nonveg;
