export function getGlucoseStatus(
  glucose: string,
  fasting: string
) {
  const value = Number(glucose);

  if (Number.isNaN(value)) {
    return "Unknown";
  }

  if (fasting === "yes") {
    if (value < 70) {
      return "Low";
    }

    if (value <= 99) {
      return "Normal";
    }

    return "High";
  }

  if (value < 70) {
    return "Low";
  }

  if (value <= 139) {
    return "Normal";
  }

  return "High";
}

