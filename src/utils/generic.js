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
