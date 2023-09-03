// import Image from "next/image";
import Divider from "@/components/heartDivider"
import PostCard from "@/components/defaultPostCard"


// export is the dunction that makes it to the website?
export default function Home() {
  return (
    <div className="Home">
      <div>
        <h3>Welcome,</h3>
        <h2 className="font-bold custom-header">@Guest! </h2>
      </div>
      <div>
        <Divider />
      </div>
      <div className="flex flex-row gap-x-10">
        <PostCard msg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt mattis odio eu pretium. Maecenas faucibus risus et diam imperdiet, nec blandit est aliquet. Vivamus tristique posuere luctus. Praesent pellentesque sapien eros, eu sodales erat elementum in." />
        <PostCard msg="help" />
        <PostCard msg="end it pls" />
      </div>
      <div className="Search bar">
        <p>Search</p>
      </div>

      <div className="Sort">
        <p>Sort</p>
      </div>

    </div>
  )
}

