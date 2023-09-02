// import Image from "next/image";
import Divider from "@/components/heartDivider"


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
      <div className="Search bar">
        <p>Search</p>
      </div>

      <div className="Sort">
        <p>Sort</p>
      </div>

    </div>
  )
}

