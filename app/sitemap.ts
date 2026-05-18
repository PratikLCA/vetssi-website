import type { MetadataRoute } from "next";
import { protocols } from "@/data/protocols";

const BASE_URL = "https://vetssi.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE_URL}/protocols`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/contamination-pathways`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/roles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/contributors`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
];

const protocolRoutes: MetadataRoute.Sitemap = protocols.map((p) => ({
  url: `${BASE_URL}/protocols/${p.slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...protocolRoutes];
}
