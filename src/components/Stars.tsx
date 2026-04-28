import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarsProps {
  value: number;
  size?: number;
  className?: string;
}

export const Stars = ({ value, size = 16, className }: StarsProps) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} de 5 estrellas`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full;
        const half = i === full && hasHalf;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="text-gold/30" strokeWidth={1.5} />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star size={size} className="text-gold fill-gold" strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
