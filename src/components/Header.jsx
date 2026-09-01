import React from "react";
import { FaUtensils, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import styles from "./Header.module.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Top Branding Row */}
        <div className={styles.brandRow}>
          <div className={styles.logoBadge} aria-hidden="true">
            <FaUtensils className={styles.logoIcon} />
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
            <FaMagnifyingGlass size={16} />
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
              <FaXmark size={13} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
