export type GalleryImageId =
  | "minaret-construction"
  | "galeshewe-minaret"
  | "koffiefontein-exterior"
  | "britstown-interior"
  | "britstown-exterior";

export const GALLERY_IMAGES: Record<
  GalleryImageId,
  { src: string; width: number; height: number; span: "tall" | "wide" | "normal" }
> = {
  "minaret-construction": {
    src: "/images/gallery/minaret-construction.jpg",
    width: 531,
    height: 1800,
    span: "tall",
  },
  "galeshewe-minaret": {
    src: "/images/gallery/galeshewe-minaret.jpg",
    width: 1164,
    height: 1800,
    span: "tall",
  },
  "koffiefontein-exterior": {
    src: "/images/gallery/koffiefontein-exterior.jpg",
    width: 1799,
    height: 1196,
    span: "wide",
  },
  "britstown-interior": {
    src: "/images/gallery/britstown-interior.jpg",
    width: 1262,
    height: 1800,
    span: "normal",
  },
  "britstown-exterior": {
    src: "/images/gallery/britstown-exterior.jpg",
    width: 1503,
    height: 1800,
    span: "normal",
  },
};

export const GALLERY_ORDER: GalleryImageId[] = [
  "galeshewe-minaret",
  "koffiefontein-exterior",
  "britstown-interior",
  "minaret-construction",
  "britstown-exterior",
];
