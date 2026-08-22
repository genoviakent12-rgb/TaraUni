export const Colors = { 
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
  },
  dark: { 
    text: '#FFFFFF',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
  },

  background: '#FFFFFF',
  blackBackground: '#000000ff',   // solid, lighter, warmer — softer complement to teal, not fighting it
  whiteText: '#FFFFFF',           //white text
  text: '#2C3331',             // slightly warmer/darker than before, better contrast on mint surfaces
  textSecondary: '#02a5b4ff',    // deeper teal — more legible than the near-pastel original
  surface: '#fafafaff',          // mint, very close to your original, kept as the anchor tone
  highlight: '#34e2f9ff',        // same green family, slightly less neon so it doesn't clash with teal
  button: '#3A6EA5',           // deeper, slightly more saturated blue for stronger contrast against mint
  gray: '#8E8E93',
  lightGray: '#e4e4e470',
};

export const Fonts = {
  font: { 
    fontHero: require('../assets/fonts/Anton-Regular.ttf'),
    fontExtraBold: require('../assets/fonts/Manrope-ExtraBold.ttf'),
    fontBold: require('../assets/fonts/Manrope-Bold.ttf'),
    fontMedium: require('../assets/fonts/Manrope-Medium.ttf'),
    fontRegular: require('../assets/fonts/Manrope-Regular.ttf'),
  }

}