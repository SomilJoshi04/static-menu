import React, { useEffect, useRef, useState } from "react";
import { FaXmark, FaUtensils } from "react-icons/fa6";
import CategoryIcon from "./CategoryIcon";
import styles from "./ItemDetailsModal.module.css";

const ItemDetailsModal = ({ item, category, onClose }) => {
  const [imgErr, setImgErr] = useState(false);
  const closeRef = useRef(null);
  const imgSrc = item.image || category?.image;
  const isPizza = !!(item.smallPrice !== undefined);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Render price section
  const renderPrice = () => {
    if (isPizza) {
      return (
        <div className={styles.pizzaPrices}>
          <div className={styles.pizzaPrice}>
            <span className={styles.pizzaSizeLabel}>Small</span>
            <span className={styles.pizzaPriceVal}>₹{item.smallPrice}</span>
          </div>
          <div className={styles.pizzaDivider} aria-hidden="true" />
          <div className={styles.pizzaPrice}>
            <span className={styles.pizzaSizeLabel}>Large</span>
            <span className={styles.pizzaPriceVal}>₹{item.largePrice}</span>
          </div>
        </div>
      );
    }
    if (item.price === null || item.price === undefined) {
      return (
        <div className={styles.priceRow}>
          <span className={styles.askCounter}>Ask at Counter</span>
        </div>
      );
    }
    return (
      <div className={styles.priceRow}>
        <span className={styles.price}>₹{item.price}</span>
      </div>
    );
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${item.name}`}
    >
      <div className={styles.sheet}>
        {/* Close Button */}
        <button
          ref={closeRef}
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close details"
        >
          <FaXmark size={15} />
        </button>

        {/* Food Image */}
        <div className={styles.imgWrap}>
          {!imgErr && imgSrc ? (
            <img
              src={imgSrc}
              alt={item.name}
              className={styles.img}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className={styles.imgFallback} aria-hidden="true">
              {category?.id ? (
                <CategoryIcon categoryId={category.id} className={styles.fallbackIcon} />
              ) : (
                <FaUtensils size={44} color="#D4AF37" opacity={0.6} />
              )}
            </div>
          )}
          <div className={styles.imgGradient} aria-hidden="true" />
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Category Badge */}
          {category && (
            <span className={styles.catBadge}>
              <CategoryIcon categoryId={category.id} />
              <span>{category.category}</span>
            </span>
          )}

          {/* Item Name */}
          <h2 className={styles.itemName}>{item.name}</h2>

          {/* Divider */}
          <div className={styles.divider} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot}>◆</span>
            <span className={styles.dividerLine} />
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            {renderPrice()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
