// import Image from "next/image";
import Divider from "@/components/heartDivider"
import PostCard from "@/components/defaultPostCard"
import { get, post } from "@/util/request";

// export is the dunction that makes it to the website?
export default async function Home() {
  // const res = await fetch("http://localhost:3030/posts", { method: "GET", cache: "no-store" })
  // let login_res = await post("/auth/login", {username:"test123", password:"test123"})

  // let token = login_res.token
  // let id = login_res.id
  // await post("/post", { message: "i cannnot believe this", images: "", anonymous: false, themeId:"3841fa45-0e54-401c-a31b-57676ee8f98c" }, 
  // {
  //   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMDY3N2QxZi1mNWM0LTQ1Y2MtYTMwMC0wY2ZhZTFjNjFkMjIiLCJpYXQiOjE2OTM4MTc2MDcsImV4cCI6MTY5MzkwNDAwN30.BpAC03yLfHuUVGcu-naS9Zn-5KC6ye4jHMF_-uXseD0",
  //   "id": "f0677d1f-f5c4-45cc-a300-0cfae1c61d22"
  // }) 

  let fetchedPosts = [];
  try {
    const { posts } = (await get(
      `/posts?offset=${0}`, { method: "GET", cache: "no-store" }
    )) as any;
    fetchedPosts = posts;
  } catch (err) {
    fetchedPosts = [];
  }

  console.log(fetchedPosts.length)
  // console.log(fetchedPosts)

  return (
    <div className="flex flex-col gap-4 m-12">
      <div>
        <h3>Welcome,</h3>
        <h2 className="font-bold custom-header">@Guest! </h2>
      </div>
      <div>
        <Divider />
      </div>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
        {
          fetchedPosts.map((post: any) => {
            console.log("hello")
            console.log(post.message)
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
                      username={post.author.username}/>;
          })
        }

      </div>
      {/* <div className="Search bar">
        <p>Search</p>
      </div>

      <div className="Sort">
        <p>Sort</p>
      </div> */}

    </div>
  )
}

