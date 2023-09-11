"use client";
import Divider from "@/components/HeartDivider";
import PostCard from "@/components/DefaultPostCard";
import { get } from "@/util/request";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

export default function Home() {
  const postFinishedRef = useRef(false);
  const loadingRef = useRef(false);
  const indexRef = useRef(0);
  const [displayPosts, setDisplayPosts] = useState<object[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  let username = "Guest";
  let header = {};

  const paginationOffset = 25;

  if (session) {
    const user = session.user as {
      authorization: string;
      id: string;
      username: string;
      profilePicture: string;
    };
    username = user.username;
    header = { authorization: user.authorization, id: user.id };
  }

  const changeLoading = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const loadMore = async (index: number) => {
    const fetchPosts = async () => {
      let fetchedPosts = [];
      changeLoading(true);
      try {
        const { posts } = await get(`/posts?offset=${index}`, {}, header);
        fetchedPosts = posts;
      } catch (err) {
        fetchedPosts = [];
      }
      changeLoading(false);
      return fetchedPosts;
    };

    if (
      window.innerHeight + window.scrollY < document.body.offsetHeight ||
      postFinishedRef.current ||
      loadingRef.current
    ) {
      return;
    }

    const posts = await fetchPosts();
    if (posts.length === 0) {
      postFinishedRef.current = true;
    } else {
      setDisplayPosts((prev) => [...prev, ...posts]);
    }
  };

  useEffect(() => {
    const resetRefs = () => {
      postFinishedRef.current = false;
      indexRef.current = 0;
    };

    const getDefaultResults = async () => {
      changeLoading(true);
      try {
        const { posts } = await get(`/posts?offset=0`, {}, header);
        setDisplayPosts(posts);
        indexRef.current += paginationOffset;
      } catch (err) {
        setDisplayPosts([]);
      }
      changeLoading(false);
    };

    const loadOnScroll = async () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !postFinishedRef.current &&
        !loadingRef.current
      ) {
        await loadMore(indexRef.current);
        indexRef.current += paginationOffset;
      }
    };

    resetRefs();
    getDefaultResults();

    window.addEventListener("scroll", loadOnScroll);
    return () => window.removeEventListener("scroll", loadOnScroll);
  }, []);

  return (
    <div className="flex flex-col gap-4 m-12">
      <div>
        <h3>Welcome,</h3>
        <h2 className="font-bold custom-header">@{username}! </h2>
      </div>
      <div>
        <Divider />
      </div>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
        {displayPosts.map((post: any) => {
          return (
            <PostCard
              msg={post.message}
              textColor={post.theme.textColor}
              backgroundColor={post.theme.backgroundColor}
              image={post.theme.image}
              name={post.theme.name}
              likes={post.likes.length}
              comments={post.comments.length}
              profile={post.author.profilePicture}
              anonymous={post.anonymous}
              username={post.author.username}
              id={post.postId}
            />
          );
        })}
      </div>
      <div className="m-auto">{loading && <Spinner fill="#000000" />}</div>
    </div>
  );
}
