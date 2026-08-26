import { createLucideIcon } from "lucide-react";

/**
 * lucide-react v1 removed brand glyphs (Facebook, etc.) for trademark reasons,
 * so we mint the ones we need locally. The result is a genuine `LucideIcon`,
 * so it accepts the same props (size, className, strokeWidth…) as any other.
 */
export const FacebookIcon = createLucideIcon("Facebook", [
  [
    "path",
    {
      d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
      key: "facebook-f",
    },
  ],
]);
