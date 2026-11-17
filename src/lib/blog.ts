import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;
export const archiveUrl = "/bai-viet/";
const defaultTags = ["Forensics", "Công nghệ", "Tản mạn"];

export function tagSlug(tag: string) {
  const slug = tag.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")
    .replaceAll("đ", "d").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
  return slug || Array.from(tag, char => char.codePointAt(0)!.toString(16)).join("-");
}

export function tagUrl(tag: string) {
  return archiveUrl + "chu-de/" + encodeURIComponent(tagSlug(tag)) + "/";
}

export function postUrl(post: Post) {
  return archiveUrl + post.id.split("/").map(encodeURIComponent).join("/") + "/";
}

export async function getPosts() {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export function getTags(posts: Post[]) {
  const tags = new Map(defaultTags.map(tag => [tagSlug(tag), tag]));
  for (const post of posts) {
    for (const tag of post.data.tags) {
      if (!tags.has(tagSlug(tag))) tags.set(tagSlug(tag), tag);
    }
  }
  return [...tags.values()];
}

export function dateISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function displayDate(date: Date) {
  return dateISO(date).split("-").reverse().join(".");
}

export function readTime(post: Post) {
  const prose = (post.body ?? "").replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "").replace(/^#+\s.*$/gm, "").trim();
  const words = prose ? prose.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 210)) + " phút đọc";
}
