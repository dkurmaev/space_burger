import React from "react";

const CustomPagination = ({ currentSlide, slideCount, onClick }) => (
  <div className="custom-pagination">
    {Array.from({ length: slideCount }).map((_, index) => (
      <span
        key={index}
        className={index === currentSlide ? "active" : ""}
        onClick={() => onClick(index)}
      ></span>
    ))}
  </div>
);

export default CustomPagination;
