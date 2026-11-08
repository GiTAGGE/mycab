export const brand = {
  name: "SeeCabs",
  tagline: "Find Your Ride.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919900112233",
  phoneNumber:
    process.env.NEXT_PUBLIC_PHONE_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "919900112233",
  cityDefault: "bangalore",
};

export const ATTR_STORAGE_KEY = "mycab_attribution_v1";
