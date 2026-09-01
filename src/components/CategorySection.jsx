import React from "react";
import MenuItemCard from "./MenuItemCard";
import styles from "./CategorySection.module.css";

const CategorySection = ({ category, onSelectItem }) => {
  const handleSelect = (item) => {
    onSelectItem(item, category);
  };

  return (
    <section
      id={category.id}
      className={styles.section}
      aria-labelledby={`heading-${category.id}`}
    >
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.decoRow} aria-hidden="true">
          <span className={styles.decoLine} />
          <span className={styles.decoDot}>◆</span>
          <span className={styles.decoLine} />
        </div>

        <div className={styles.titleRow}>
          <div className={styles.titleGroup}>
            <h2 className={styles.title} id={`heading-${category.id}`}>
              {category.category}
            </h2>
            {category.categoryHindi && (
              <span className={styles.titleHindi} lang="hi">
                {category.categoryHindi}
              </span>
            )}
          </div>
        </div>

        <div className={styles.decoRow} aria-hidden="true">
          <span className={styles.decoLine} />
          <span className={styles.decoDot}>◆</span>
          <span className={styles.decoLine} />
        </div>
      </div>

      {/* Items Grid */}
      <div className={styles.grid}>
        {category.items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            categoryImage={category.image}
            isPizza={!!category.isPizza}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
