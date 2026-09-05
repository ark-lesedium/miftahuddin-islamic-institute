import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miftahuddin Islamic Institute",
    short_name: "Miftahuddin",
    description:
      "Miftahuddin Islamic Institute is a Kimberley-based Islamic organisation dedicated to Ta'leem, social welfare and Tableegh across the Northern Cape and Free State, South Africa.",
    start_url: `${BASE_PATH}/en/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#71613d",
    icons: [
      {
        src: `${BASE_PATH}/icon.png`,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: `${BASE_PATH}/apple-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
