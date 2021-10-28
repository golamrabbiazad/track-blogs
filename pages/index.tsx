import Link from "next/link";
import API from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { listPosts } from "../graphql/queries";
import { Post } from "../models/post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });

    const { items } = postData.data.listPosts;
    console.log("postData", items);
    setPosts(items);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <a>
            <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 mt-2">Author: {post.username}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
