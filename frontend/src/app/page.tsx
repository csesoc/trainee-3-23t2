"use client";
// import Image from "next/image";
import Divider from "@/components/heartDivider"
import PostCard from "@/components/defaultPostCard"
import { get, post } from "@/util/request";
import { getServerSession } from "next-auth/next";
import { options } from "@/lib/auth"
import { LoadMore } from "@/components/loadMore";
import { useEffect, useRef, useState } from "react";

// export is the dunction that makes it to the website?
export default async function Home() {
  const postFinishedRef = useRef(false);
  const indexRef = useRef(0);
  // const searchCoursesRef = useRef([]);

  const [displayPosts, setDisplayPosts] = useState<object[]>([]);

  const paginationOffset = 25;

  const loadMore = async (index: number) => {
    const fetchPosts = async () => {
      let fetchedPosts = [];
      try {
        const { posts } = (await get(
          `/posts?offset=${index}`,
        )) as any;
        fetchedPosts = posts;
      } catch (err) {
        fetchedPosts = [];
      }
      return fetchedPosts;
    };

    if (window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
      return;
    }
    if (postFinishedRef.current) {
      return;
    }

    const posts = await fetchPosts();
    if (posts.length === 0) {
      postFinishedRef.current = true;
      return;
    }

    setDisplayPosts((prev) => [...prev, ...posts]);
  };

  useEffect(() => {
    const resetRefs = () => {
      postFinishedRef.current = false;
      indexRef.current = 0;
    };

    const getDefaultResults = async () => {
      try {
        const { posts } = (await get(`/posts?offset=${0}`)) as any;
        setDisplayPosts(posts);
        indexRef.current += paginationOffset;
      } catch (err) {
        setDisplayPosts([]);
      }
    };

    const getInitialDisplayPosts = () => {
      // if (searchTerm === "") {
        getDefaultResults();
      // } else {
      //   getSearchResults();
      // }
    };

    const loadOnScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
        !postFinishedRef.current
      ) {
        loadMore(indexRef.current);
        indexRef.current += paginationOffset;
      }
    };

    resetRefs();
    getInitialDisplayPosts();

    window.addEventListener("scroll", loadOnScroll);
    return () => window.removeEventListener("scroll", loadOnScroll);
  }, []);


  let username = "Guest"
  let userId = ""
  // const session = useSession();
  const session = await getServerSession(options)
  if (session) {
    const user = session.user as { username: string, profilePicture: string, id: string, authorization: string }
    username = user.username
    userId = user.id
    // console.log(session.user.username)
  }

  // let fetchedPosts = [];
  // try {
  //   const { posts } = (await get(
  //     `/posts?offset=${0}`, { method: "GET" }
  //   )) as any;
  //   fetchedPosts = posts;
  // } catch (err) {
  //   fetchedPosts = [];
  // }

  // fetchedPosts = fetchedPosts.filter((post: any) => {
  //   return userId != post.author.userId ? true : false
  // })


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
        {
          displayPosts.map((post: any) => {
            return <PostCard 
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
                      id={post.postId}/>;
          })
        }
        {/* <LoadMore /> */}

      </div>

    </div>
  )
}