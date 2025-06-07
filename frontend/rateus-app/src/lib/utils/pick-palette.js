const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

export const pickPalette = (name) => {
  if (!name) {
    return colorPalette[0];
  }
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

export const pickRatingPalette = (rating) => {
  if (typeof rating != "number") {
    return "gray";
  }
  if (rating >= 4.0) {
    return "green";
  } else if (rating >= 3.0) {
    return "yellow";
  } else if (rating >= 2.0) {
    return "orange";
  } else if (rating >= 1.0) {
    return "red";
  }
  return "gray";
};
