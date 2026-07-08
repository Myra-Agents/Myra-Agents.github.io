import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Myra Agents",
    short_name: "Myra Agents",
    description: "Your AI workforce, running 24/7.",
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: "/assets/app-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/assets/apple-touch.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
