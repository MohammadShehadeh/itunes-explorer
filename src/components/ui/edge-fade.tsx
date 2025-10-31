import { cn } from "@/lib/utils";

interface EdgeFadeProps {
  position: "left" | "right";
  width?: string;
  height?: string;
  fromColor?: string;
}

export const EdgeFade = ({
  position,
  width = "w-16",
  height = "h-full",
  fromColor = "from-background",
}: EdgeFadeProps) => {
  const gradientClass =
    position === "right"
      ? `bg-gradient-to-l ${fromColor} to-transparent`
      : `bg-gradient-to-r ${fromColor} to-transparent`;

  return (
    <div
      className={cn(
        `absolute z-10 top-0 ${position}-0 ${width} ${height} ${gradientClass} pointer-events-none`,
        {
          "left-0": position === "left",
          "right-0": position === "right",
        },
      )}
    />
  );
};
