import { LoaderFunction } from "@remix-run/node";
import { marked } from "marked";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

import type { Post } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";

type LoaderData = { post: Post, html: string};

export const loader: LoaderFunction = async ({
    params,
  }) => {
    invariant(params.slug, `params.slug is required`);
  
    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);
  
    const html = marked(post.markdown);
    return json<LoaderData>({ post, html });
  };

  export default function PostSlug() {
    const { post, html } = useLoaderData() as LoaderData;
    return (
      <main className="mx-auto max-w-4xl">
        <h1>
          Title: {post.title}
        </h1>
        <div dangerouslySetInnerHTML={{__html: html}}/>
      </main>
    );
  }