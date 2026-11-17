import type { APIRoute } from "astro";
import { displayDate, getPosts, postUrl } from "../../lib/blog";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const records = posts.map(post => ({
    url: postUrl(post),
    title: post.data.title,
    category: post.data.tags.join(" · "),
    summary: post.data.description,
    date: displayDate(post.data.date),
  }));
  return new Response("window.journalPosts = " + JSON.stringify(records) + ";\n", {
    headers: { "Content-Type": "application/javascript; charset=utf-8" },
  });
};
