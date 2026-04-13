import { Platform } from 'react-native';

const tintColorLight = '#a78bfa';
const tintColorDark = '#a78bfa';

export const Colors = {
  light: {
    text: '#ffffff',
    background: '#0d0620',
    tint: tintColorLight,
    icon: '#9b8ab8',
    tabIconDefault: '#9b8ab8',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#0d0620',
    tint: tintColorDark,
    icon: '#9b8ab8',
    tabIconDefault: '#9b8ab8',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
