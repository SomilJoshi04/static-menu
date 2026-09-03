import React from "react";
import {
  FaUtensils,
  FaPizzaSlice,
  FaBurger,
  FaMugHot,
  FaMugSaucer,
  FaBowlRice,
  FaBowlFood,
  FaPepperHot,
  FaBreadSlice,
  FaGlassWater,
  FaFire,
  FaPlateWheat,
  FaCookieBite,
} from "react-icons/fa6";

export const getCategoryIcon = (categoryId, className = "") => {
  switch (categoryId) {
    case "all":
      return <FaUtensils className={className} />;
    case "south-indian":
      return <FaPlateWheat className={className} />;
    case "special-nashta":
      return <FaMugHot className={className} />;
    case "coffee":
      return <FaMugSaucer className={className} />;
    case "shake":
      return <FaGlassWater className={className} />;
    case "cold-drinks":
      return <FaGlassWater className={className} />;
    case "sandwich":
      return <FaBreadSlice className={className} />;
    case "pav-bhaji":
      return <FaBowlFood className={className} />;
    case "pasta":
      return <FaPlateWheat className={className} />;
    case "pizza":
      return <FaPizzaSlice className={className} />;
    case "rice":
      return <FaBowlRice className={className} />;
    case "burger":
      return <FaBurger className={className} />;
    case "chilli-paneer":
      return <FaPepperHot className={className} />;
    case "dabeli":
      return <FaBreadSlice className={className} />;
    case "snacks":
      return <FaCookieBite className={className} />;
    case "noodles":
      return <FaBowlFood className={className} />;
    case "manchurian":
      return <FaFire className={className} />;
    case "momos":
      return <FaBowlFood className={className} />;
    case "maggi":
      return <FaBowlFood className={className} />;
    case "chaat-center":
      return <FaPlateWheat className={className} />;
    default:
      return <FaUtensils className={className} />;
  }
};

const CategoryIcon = ({ categoryId, className = "" }) => {
  return getCategoryIcon(categoryId, className);
};

export default CategoryIcon;
