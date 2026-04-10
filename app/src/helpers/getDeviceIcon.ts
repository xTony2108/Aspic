export const getDeviceIcon = (name: string) => {
  if (/iphone|ios|android/i.test(name)) return "📱";
  if (/ipad/i.test(name)) return "📟";
  if (/safari/i.test(name)) return "🧭";
  if (/firefox/i.test(name)) return "🦊";
  if (/edge/i.test(name)) return "🌀";
  if (/chrome/i.test(name)) return "🔵";
  return "🖥️";
};
