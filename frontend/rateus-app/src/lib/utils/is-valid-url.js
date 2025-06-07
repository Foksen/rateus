export function isValidImageUrl(url) {
  return (
    typeof url === "string" &&
    url.length > 0 &&
    (url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("data:"))
  );
}
