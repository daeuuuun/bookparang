import { useState } from "react";

type StarRatingProps = {
  rating: number; // 0..10
  height?: number;
  className?: string;
  onClick?: (rating: number) => void; // Optional for interactive mode
};

export default function StarRating({ rating, height = 30, className = "", onClick }: StarRatingProps) {
  const safeRating = Math.max(0, Math.min(10, rating));
  const convertedTo5 = safeRating / 2;
  const rounded = Math.round(convertedTo5 * 2) / 2;

  const staticImage = `/StarRating/${rounded.toFixed(1)}점.svg`;

  // ✅ Interactive mode
  if (onClick) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hover, setHover] = useState(0);
    const display = hover > 0 ? hover : convertedTo5;
    const hoverImage = `/StarRating/${display.toFixed(1)}점.svg`;

    return (
      <div style={{ display: "inline-block", cursor: "pointer", position: "relative" }}>
        <img
          src={hoverImage}
          alt={`평점 ${display} / 5`}
          height={height}
          className={className}
          style={{ display: "inline-block", verticalAlign: "middle" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
          }}
        >
          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((val) => (
            <div
              key={val}
              style={{ flex: 1, cursor: "pointer" }}
              onMouseEnter={() => setHover(val)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onClick(val * 2)} // convert back to 10-point
            />
          ))}
        </div>
      </div>
    );
  }

  // ✅ Static mode
  return (
    <img
      src={staticImage}
      alt={`평점 ${rounded} / 5`}
      height={height}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}
