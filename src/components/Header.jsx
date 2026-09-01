import React from "react";
import styles from "./Header.module.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Top Branding Row */}
        <div className={styles.brandRow}>
          <div className={styles.logoBadge} aria-hidden="true">
            <span className={styles.logoIcon}>🍽️</span>
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.restaurantName} lang="hi">
              प्रहलाद भेल, पकौड़ी, केफे एण्ड फास्ट फुड
            </h1>
            <p className={styles.tagline}>
              Fresh <span>•</span> Tasty <span>•</span> Hygienic <span>•</span> Made with Love
            </p>
          </div>
        </div>

        {/* Search Bar Row */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search for pizza, burger, noodles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search menu items"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
