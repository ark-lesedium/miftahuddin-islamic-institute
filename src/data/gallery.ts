import { assetPath } from "@/lib/asset-path";

export type GalleryImageId =
  | "minaret-construction"
  | "galeshewe-minaret"
  | "koffiefontein-exterior"
  | "britstown-interior"
  | "britstown-exterior"
  | "cbd-masjid-facade"
  | "cbd-masjid-interior"
  | "cbd-masjid-signage"
  | "cbd-masjid-street"
  | "roodepan-palms"
  | "roodepan-sunset"
  | "roodepan-interior"
  | "hamza-exterior"
  | "hamza-interior"
  | "mustafa-exterior"
  | "mustafa-interior"
  | "ritchie-exterior"
  | "haji-adams-centre-facade"
  | "haji-adams-centre-museum"
  | "haji-adams-centre-signage"
  | "roodepan-street";

export const GALLERY_IMAGES: Record<
  GalleryImageId,
  { src: string; width: number; height: number; span: "tall" | "wide" | "normal" }
> = {
  "minaret-construction": {
    src: assetPath("/images/gallery/minaret-construction.jpg"),
    width: 531,
    height: 1800,
    span: "tall",
  },
  "galeshewe-minaret": {
    src: assetPath("/images/gallery/galeshewe-minaret.jpg"),
    width: 1164,
    height: 1800,
    span: "tall",
  },
  "koffiefontein-exterior": {
    src: assetPath("/images/gallery/koffiefontein-exterior.jpg"),
    width: 1799,
    height: 1196,
    span: "wide",
  },
  "britstown-interior": {
    src: assetPath("/images/gallery/britstown-interior.jpg"),
    width: 1262,
    height: 1800,
    span: "normal",
  },
  "britstown-exterior": {
    src: assetPath("/images/gallery/britstown-exterior.jpg"),
    width: 1503,
    height: 1800,
    span: "normal",
  },
  "cbd-masjid-facade": {
    src: assetPath("/images/gallery/cbd-masjid-facade.jpg"),
    width: 900,
    height: 1600,
    span: "tall",
  },
  "cbd-masjid-interior": {
    src: assetPath("/images/gallery/cbd-masjid-interior.jpg"),
    width: 1600,
    height: 900,
    span: "wide",
  },
  "cbd-masjid-signage": {
    src: assetPath("/images/gallery/cbd-masjid-signage.jpg"),
    width: 900,
    height: 1600,
    span: "normal",
  },
  "cbd-masjid-street": {
    src: assetPath("/images/gallery/cbd-masjid-street.jpg"),
    width: 900,
    height: 1600,
    span: "normal",
  },
  "roodepan-palms": {
    src: assetPath("/images/gallery/roodepan-palms.jpg"),
    width: 680,
    height: 510,
    span: "wide",
  },
  "roodepan-sunset": {
    src: assetPath("/images/gallery/roodepan-sunset.jpg"),
    width: 680,
    height: 510,
    span: "normal",
  },
  "roodepan-interior": {
    src: assetPath("/images/gallery/roodepan-interior.jpg"),
    width: 680,
    height: 510,
    span: "normal",
  },
  "hamza-exterior": {
    src: assetPath("/images/gallery/hamza-exterior.jpg"),
    width: 680,
    height: 510,
    span: "normal",
  },
  "hamza-interior": {
    src: assetPath("/images/gallery/hamza-interior.jpg"),
    width: 680,
    height: 331,
    span: "normal",
  },
  "mustafa-exterior": {
    src: assetPath("/images/gallery/mustafa-exterior.jpg"),
    width: 382,
    height: 510,
    span: "normal",
  },
  "mustafa-interior": {
    src: assetPath("/images/gallery/mustafa-interior.jpg"),
    width: 680,
    height: 510,
    span: "normal",
  },
  "ritchie-exterior": {
    src: assetPath("/images/gallery/ritchie-exterior.jpg"),
    width: 680,
    height: 382,
    span: "normal",
  },
  "haji-adams-centre-facade": {
    src: assetPath("/images/gallery/haji-adams-centre-facade.jpg"),
    width: 1800,
    height: 1351,
    span: "wide",
  },
  "haji-adams-centre-museum": {
    src: assetPath("/images/gallery/haji-adams-centre-museum.jpg"),
    width: 1800,
    height: 1351,
    span: "normal",
  },
  "haji-adams-centre-signage": {
    src: assetPath("/images/gallery/haji-adams-centre-signage.jpg"),
    width: 1800,
    height: 1351,
    span: "normal",
  },
  "roodepan-street": {
    src: assetPath("/images/gallery/roodepan-street.jpg"),
    width: 680,
    height: 510,
    span: "normal",
  },
};

// Curated set used for the homepage hero slideshow.
export const HERO_IMAGE_IDS: GalleryImageId[] = [
  "haji-adams-centre-facade",
  "roodepan-street",
  "cbd-masjid-interior",
];

export const GALLERY_ORDER: GalleryImageId[] = [
  "cbd-masjid-facade",
  "cbd-masjid-interior",
  "roodepan-palms",
  "galeshewe-minaret",
  "mustafa-interior",
  "koffiefontein-exterior",
  "hamza-interior",
  "britstown-interior",
  "roodepan-sunset",
  "cbd-masjid-signage",
  "minaret-construction",
  "mustafa-exterior",
  "britstown-exterior",
  "hamza-exterior",
  "roodepan-interior",
  "ritchie-exterior",
  "cbd-masjid-street",
  "haji-adams-centre-facade",
  "haji-adams-centre-museum",
  "haji-adams-centre-signage",
  "roodepan-street",
];
