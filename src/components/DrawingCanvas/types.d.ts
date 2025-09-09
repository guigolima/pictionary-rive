export interface Point {
  x: number;
  y: number;
}

export interface DrawingCanvasProps {
  paths: string[];
  setPaths: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?: boolean;
}
