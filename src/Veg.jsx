import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './veg.css';

function Veg() {
  const vegItems = useSelector(state => state.products.Veg || []);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const itemsPerPage = 5;

  const uniquePrices = [...new Set(vegItems.map(item => item.Price))].sort((a, b) => a - b);

  const priceRanges = [
    { label: '₹0 – ₹100', min: 0, max: 100 },
    { label: '₹101 – ₹200', min: 101, max: 200 },
    { label: '₹201 – ₹300', min: 201, max: 300 },
    { label: '₹301 – ₹500', min: 301, max: 500 },
    { label: '₹501+', min: 501, max: Infinity },
  ];

  const handleRangeCheckbox = (label) => {
    setSelectedRanges(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
    setCurrentPage(1);
  };

  const handleRangeChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedPrices([]);
    setSelectedRanges([]);
    setMinPrice(0);
    setMaxPrice(500);
  };

  // Filtering logic
  const filteredItems = vegItems.filter(item => {
    const price = parseFloat(item.Price);

    const matchCustomRange = (() => {
      const min = minPrice === '' ? 0 : parseFloat(minPrice);
      const max = maxPrice === '' ? Infinity : parseFloat(maxPrice);
      return price >= min && price <= max;
    })();

    const matchPredefinedRange = selectedRanges.length > 0
      ? selectedRanges.some(label => {
          const r = priceRanges.find(r => r.label === label);
          return price >= r.min && price <= r.max;
        })
      : true;

    return matchCustomRange && matchPredefinedRange;
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
    <div className="veg-page">
      <h2 className="section-title">Fresh Vegetables</h2>

      {/* Filters */}
      <div className="filter-section">
        {/* Price Slider */}
        <div className="price-slider">
          <label>
            Min Price: ₹{minPrice}
            <input
              type="range"
              min="0"
              max="500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>

          <label>
            Max Price: ₹{maxPrice}
            <input
              type="range"
              min="0"
              max="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>

        {/* Predefined Ranges */}
        <div className="range-checkboxes">
          <h4>Price Ranges:</h4>
          {priceRanges.map((range, index) => (
            <label key={index} className="price-option">
              <input
                type="checkbox"
                checked={selectedRanges.includes(range.label)}
                onChange={() => handleRangeCheckbox(range.label)}
              />
              {range.label}
            </label>
          ))}
        </div>

        {/* Clear Button */}
        <button className="clear-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="veg-grid">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <div key={index} className="veg-card">
              <img src={item.image} alt={item.name} className="veg-image" />
              <h4>{item.name}</h4>
              <p className="veg-price">₹{item.Price}/KG</p>
              <button
                className="add-to-cart-btn"
                onClick={() => dispatch(addToCart(item))}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No items found in this range.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Veg;
