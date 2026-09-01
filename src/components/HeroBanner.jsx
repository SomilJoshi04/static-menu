import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import bannerData from "../data/bannerData";
import styles from "./HeroBanner.module.css";

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left -> Next banner
        setCurrentIndex((prev) => (prev + 1) % bannerData.length);
      } else {
        // Swipe right -> Prev banner
        setCurrentIndex((prev) => (prev - 1 + bannerData.length) % bannerData.length);
      }
    }
  };

  const handleBannerClick = (categoryId) => {
    const el = document.getElementById(categoryId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentBanner = bannerData[currentIndex];

  return (
    <section
      className={styles.bannerSection}
      aria-label="Featured specials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.container}>
        {/* Banner Card */}
        <div
          className={styles.bannerCard}
          onClick={() => handleBannerClick(currentBanner.categoryId)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleBannerClick(currentBanner.categoryId);
            }
          }}
          aria-label={`Featured: ${currentBanner.title} ${currentBanner.titleHighlight}`}
        >
          {/* Left Text Content */}
          <div className={styles.textContent}>
            <span className={styles.tagBadge}>{currentBanner.tag}</span>
            <h2 className={styles.title}>
              {currentBanner.title}{" "}
              <span className={styles.titleHighlight}>
                {currentBanner.titleHighlight}
              </span>
            </h2>
            <p className={styles.subtitle}>{currentBanner.subtitle}</p>
            <div className={styles.exploreTag}>
              <span>Explore Items</span>
              <FaArrowRight className={styles.arrowIcon} size={12} />
            </div>
          </div>

          {/* Right Image Content */}
          <div className={styles.imageWrap}>
            <img
              key={currentBanner.id}
              src={currentBanner.image}
              alt={`${currentBanner.title} ${currentBanner.titleHighlight}`}
              className={styles.foodImage}
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
          </div>
        </div>

        {/* Indicator Dots */}
        <div className={styles.indicators} role="tablist" aria-label="Banner slides">
          {bannerData.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}: ${banner.title}`}
              className={`${styles.indicatorDot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
