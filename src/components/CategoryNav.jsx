import React, { useState, useEffect, useRef } from "react";
import CategoryIcon from "./CategoryIcon";
import styles from "./CategoryNav.module.css";

const ALL_CATEGORY = {
  id: "all",
  category: "All",
  image: "/images/special-nashta/cover.jpg",
};

const CategoryNav = ({ categories }) => {
  const [activeId, setActiveId] = useState("all");
  const navRef = useRef(null);
  const scrollingRef = useRef(false);
  const cardRefs = useRef({});

  // Full category list starting with "All"
  const allCategories = [ALL_CATEGORY, ...categories];

  // Monitor visible section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;

        // Check if we are near the top of the page (then activate "All")
        const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        if (scrollTop < 120) {
          setActiveId("all");
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    const handleScrollTop = () => {
      if (scrollingRef.current) return;
      const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
      if (scrollTop < 120) {
        setActiveId("all");
      }
    };

    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [categories]);

  // Keep active category avatar visible in horizontal scroll
  useEffect(() => {
    const cardEl = cardRefs.current[activeId];
    if (cardEl) {
      cardEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeId]);

  const handleCategoryClick = (id) => {
    scrollingRef.current = true;
    setActiveId(id);

    setTimeout(() => {
      let targetElement = null;

      if (id === "all") {
        targetElement = document.getElementById(categories[0]?.id) || document.getElementById("main-content");
      } else {
        targetElement = document.getElementById(id);
      }

      if (!targetElement) {
        scrollingRef.current = false;
        return;
      }

      const navH = navRef.current?.offsetHeight || 80;
      const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
      const elTop = targetElement.getBoundingClientRect().top + scrollTop;
      const target = elTop - navH - 8;

      try {
        window.scrollTo({ top: target, behavior: "smooth" });
      } catch {
        window.scrollTo(0, target);
      }

      setTimeout(() => {
        scrollingRef.current = false;
      }, 850);
    }, 20);
  };

  return (
    <nav
      className={styles.stickyCategoryNav}
      ref={navRef}
      aria-label="Menu categories"
    >
      <div className={styles.container}>
        {/* Categories Header Title */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Categories
            <span className={styles.titleHindi} lang="hi">श्रेणियाँ</span>
          </h2>
        </div>

        {/* Circular Category Avatars Row (starts with 'All') */}
        <div className={styles.circleGrid}>
          {allCategories.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => (cardRefs.current[cat.id] = el)}
                type="button"
                className={`${styles.circleCard} ${isActive ? styles.activeCircleCard : ""}`}
                onClick={() => handleCategoryClick(cat.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Jump to ${cat.category}`}
              >
                <div className={styles.circleAvatar}>
                  <img
                    src={cat.image}
                    alt=""
                    className={styles.circleImg}
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = "flex";
                      }
                    }}
                    loading="lazy"
                  />
                  <div className={styles.circleFallback} style={{ display: "none" }}>
                    <CategoryIcon categoryId={cat.id} className={styles.iconElement} />
                  </div>
                  {isActive && <div className={styles.activeGlow} aria-hidden="true" />}
                </div>
                <span className={styles.circleLabel}>{cat.category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
