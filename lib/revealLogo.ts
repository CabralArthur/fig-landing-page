export function getRevealLogoFontSize(isMobile: boolean) {
  if (typeof window === "undefined") {
    return isMobile ? 120 : 160;
  }

  const vw = window.innerWidth;

  if (isMobile) {
    return Math.min(vw * 0.34, 130);
  }

  return Math.min(vw * 0.42, 288);
}

export function getRevealLogoEndScale(isMobile: boolean) {
  return isMobile ? 5.5 : 12;
}

export function getRevealScrollDistance(isMobile: boolean) {
  return isMobile ? "+=160%" : "+=220%";
}

export function getRevealEndFontSize(isMobile: boolean) {
  const start = getRevealLogoFontSize(isMobile);
  const scale = getRevealLogoEndScale(isMobile);

  if (typeof window === "undefined") {
    return start * scale;
  }

  if (isMobile) {
    return Math.min(start * scale, window.innerWidth * 2.2);
  }

  return start * scale;
}
