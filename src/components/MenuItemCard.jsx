import React, { useState } from "react";
import styles from "./MenuItemCard.module.css";

const MenuItemCard = ({ item, categoryImage, isPizza, onSelect }) => {
  const [imgErr, setImgErr] = useState(false);
  // item.image is primary; categoryImage is fallback
  const imgSrc = item.image || categoryImage;

  const renderPrice = () => {
    if (isPizza) {
      return (
        <div className={styles.pizzaPrices}>
          <span className={styles.pizzaTag}>
            <span className={styles.sizeLabel}>Small</span>
            <span className={styles.priceVal}>₹{item.smallPrice}</span>
          </span>
          <span className={styles.priceSep}>|</span>
          <span className={styles.pizzaTag}>
            <span className={styles.sizeLabel}>Large</span>
            <span className={styles.priceVal}>₹{item.largePrice}</span>
          </span>
        </div>
      );
    }
    if (item.price === null || item.price === undefined) {
      return <span className={styles.askCounter}>Ask at Counter</span>;
    }
    return <span className={styles.price}>₹{item.price}</span>;
  };

  return (
    <button
      className={styles.card}
      onClick={() => onSelect(item)}
      aria-label={`View details for ${item.name}`}
      type="button"
    >
      {/* Image */}
      <div className={styles.imgWrap}>
        {!imgErr && imgSrc ? (
          <img
            src={imgSrc}
            alt={item.name}
            className={styles.img}
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imgFallback} aria-hidden="true">
            <span className={styles.fallbackEmoji}>🍽️</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <span className={styles.name}>{item.name}</span>
        <div className={styles.priceRow}>{renderPrice()}</div>
      </div>
    </button>
  );
};

export default MenuItemCard;
