export const isValidAge = (
  calcAge: number,
  clientType: string | null,
  clientAge: string,
) => {
  if (!clientType) return true;

  if (clientType === "bambini") {
    switch (clientAge) {
      case "0-3":
        return calcAge >= 0 && calcAge <= 3;
      case "4-11":
        return calcAge >= 4 && calcAge <= 11;
      case "12-14":
        return calcAge >= 12 && calcAge <= 14;
      case "15-18":
        return calcAge >= 15 && calcAge <= 18;
      default:
        return true;
    }
  } else if (clientType === "adulti") {
    return calcAge >= 19 && calcAge <= 64;
  } else if (clientType === "anziani") {
    return calcAge >= 65;
  }
  return true;
};
