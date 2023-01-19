import { getAllPosts } from "../../lib/posts-util";
import AllPosts from "../../components/posts/AllPosts";

export default function AllPostsPage({ posts }) {
  return <AllPosts posts={posts} />;
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}
