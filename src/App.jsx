import React, { useState, useMemo } from "react";
import menuData from "./data/menuData";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import CategoryNav from "./components/CategoryNav";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import ItemDetailsModal from "./components/ItemDetailsModal";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectItem = (item, category) => {
    setSelectedItem(item);
    setSelectedCategory(category);
    document.body.classList.add("modal-open");
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedCategory(null);
    document.body.classList.remove("modal-open");
  };

  // Filter menu items by search query
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return menuData;

    return menuData
      .map((cat) => {
        const matchesCat = cat.category.toLowerCase().includes(query);
        const filteredItems = cat.items.filter((item) =>
          item.name.toLowerCase().includes(query)
        );

        if (matchesCat) {
          return cat;
        }

        if (filteredItems.length > 0) {
          return {
            ...cat,
            items: filteredItems,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [searchQuery]);

  return (
    <>
      {/* 1. Modern Restaurant Branding & Search Header */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Show Hero Banner & Categories Showcase when not actively searching */}
      {!searchQuery && (
        <>
          {/* 2. 4-Slide Auto-Changing Hero Banner Slider */}
          <HeroBanner />

          {/* 3. Circular Categories Showcase & Quick-Nav */}
          <CategoryNav categories={menuData} />
        </>
      )}

      {/* 4. Menu Category Sections & Food Cards */}
      <main id="main-content">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onSelectItem={handleSelectItem}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", color: "rgba(255,247,230,0.6)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🍽️</p>
            <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#F2C94C" }}>
              No dishes found for "{searchQuery}"
            </p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>
              Try searching for dosa, pizza, burger, noodles...
            </p>
          </div>
        )}
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Item Details Modal / Bottom Sheet */}
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
