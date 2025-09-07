import React from "react";
import * as LucideIcons from "lucide-react";

interface IconsProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  fill?: string;
  strokeWidth?: number | string;
}

const Icons: React.FC<IconsProps> = ({
  name,
  size = 24,
  color = "black",
  fill = "none",
  strokeWidth = 2,
  ...props
}) => {
  const IconComponent = LucideIcons[name] as React.ElementType;

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in Lucide.`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
      style={{ fill }}
    />
  );
};

export default Icons;
