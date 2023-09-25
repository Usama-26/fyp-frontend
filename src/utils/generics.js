export function convertToPath(string) {
  const path = string.toLowerCase().replace(/(\s|&)/g, (match, occurence) => {
    if (occurence === " ") {
      return "-";
    } else if (occurence === "&") {
      return "and";
    }
  });

  return path;
}
export function reversePath(string) {
  // Replace hyphens with spaces
  let result = string.replace(/-/g, " ");

  // Replace "and" with "&"
  result = result.replace(/ and /g, " & ");
  return result.replace(/\b\w/g, (match) => match.toUpperCase());
}
