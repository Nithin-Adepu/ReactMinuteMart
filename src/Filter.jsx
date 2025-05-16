// // src/components/PriceFilter.jsx
// import React, { useState, useEffect } from 'react';
// import './Filter.css';

// function Filter({ items, onFilter }) {
//   const uniquePrices = [...new Set(items.map(item => item.Price))].sort((a, b) => a - b);

//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const [sliderValue, setSliderValue] = useState(0);

//   useEffect(() => {
//     const filtered = items.filter(item => {
//       const price = parseFloat(item.Price);
//       if (selectedPrices.length > 0) {
//         return selectedPrices.includes(item.Price);
//       }
//       return price <= sliderValue;
//     });
//     onFilter(filtered);
//   }, [selectedPrices, sliderValue, items, onFilter]);

//   const handleCheckboxChange = (price) => {
//     setSelectedPrices(prev =>
//       prev.includes(price)
//         ? prev.filter(p => p !== price)
//         : [...prev, price]
//     );
//   };

//   const handleClear = () => {
//     setSelectedPrices([]);
//     setSliderValue(Math.max(...uniquePrices));
//   };

//   useEffect(() => {
//     if (uniquePrices.length > 0) {
//       setSliderValue(Math.max(...uniquePrices));
//     }
//   }, [uniquePrices]);

//   return (
//     <div className="filter-section">
//       <div className="price-slider">
//         <label>
//          const sliderMin = Math.min(...uniquePrices);
//           const sliderMax = Math.max(...uniquePrices);
//         <input
//             type="range"
//               min={sliderMin}
//               max={sliderMax}
//              value={sliderValue}
//             onChange={(e) => setSliderValue(parseFloat(e.target.value))}
//           />
//         </label>
//       </div>

//       <div className="range-checkboxes">
//         <h4>Select Exact Price(s):</h4>
//         {uniquePrices.map((price, index) => (
//           <label key={index} className="price-option">
//             <input
//               type="checkbox"
//               checked={selectedPrices.includes(price)}
//               onChange={() => handleCheckboxChange(price)}
//             />
//             ₹{price}
//           </label>
//         ))}
//       </div>

//       <button className="clear-button" onClick={handleClear}>
//         Clear Filters
//       </button>
//     </div>
//   );
// }

// export default Filter;
