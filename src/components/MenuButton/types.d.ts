export interface MenuButtonProps {
  text: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}