declare module "react-grid-layout" {
  import * as React from "react";

  export interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
    static?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;
  }

  export interface Layouts {
    [P: string]: LayoutItem[];
  }

  export interface ResponsiveProps {
    className?: string;
    width?: number;
    layouts?: Layouts;
    breakpoints?: Record<string, number>;
    cols?: Record<string, number>;
    rowHeight?: number;
    compactType?: "vertical" | "horizontal" | null;
    isDraggable?: boolean;
    isResizable?: boolean;
    draggableCancel?: string;
    onLayoutChange?: (layout: LayoutItem[], layouts: Layouts) => void;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export class Responsive extends React.Component<ResponsiveProps> {}

  export function useContainerWidth(options?: {
    measureBeforeMount?: boolean;
  }): {
    ref: React.RefObject<HTMLDivElement>;
    width: number;
  };
}
