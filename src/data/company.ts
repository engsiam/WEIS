import { buildWhatsAppUrl } from "../lib/utils";
import { FacebookIcon } from "../components/ui/icons";
import type { NavLink, SocialLink } from "../types";

export const siteUrl = "https://www.weisbd.com";

export const company = {
  name: "World Education & Immigration Services",
  shortName: "WEIS",
  descriptor: "Study · Work · Migration · Tours",
  tagline:
    "Your trusted, no.1 gateway to global opportunities across 100+ countries.",
  positioning:
    "Premium guidance, professional service, and smart solutions — at minimal cost.",
  statement:
    "WEIS helps students, professionals and families move abroad with confidence — from the right country and programme to visa approval and a smooth landing.",
  countries: "100+",
} as const;

export const contact = {
  phone: "01832-166151",
  phoneIntl: "+8801832166151",
  whatsapp: "8801832166151",
  whatsappUrl: buildWhatsAppUrl(
    "Hello WEIS 👋 I'd like to know more about your study / work / migration services."
  ),
  email: "weisbd49@gmail.com",
  address: "House 54/A, 2nd Floor, Road-133, Gulshan-1, Dhaka-1212, Bangladesh",
  addressShort: "Gulshan-1, Dhaka",
  hours: "Saturday – Thursday · 10:00 AM – 7:00 PM",
  facebook: "https://www.facebook.com/WEIS18",
} as const;

export const navLinks: NavLink[] = [
  { id: "services", label: "Services" },
  { id: "destinations", label: "Destinations" },
  { id: "programs", label: "Programs" },
  { id: "process", label: "Process" },
  { id: "why", label: "Why WEIS" },
  { id: "contact", label: "Contact" },
];

export const socials: SocialLink[] = [
  { label: "Facebook", href: contact.facebook, icon: FacebookIcon },
];
