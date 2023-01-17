import { Fragment } from "react";

import Hero from "../components/homepage/Hero";
import FeaturedPosts from "../components/homepage/FeaturedPosts";

const DUMMY_POSTS = [
  {
    title: "title",
    slug: "slug",
    image: "getting-started-nextjs.png",
    excerpt: "excerpt excerpt excerpt excerpt excerpt excerpt excerpt excerpt ",
    date: "2021-03-02",
  },
  {
    title: "title2",
    slug: "slug2",
    image: "getting-started-nextjs.png",
    excerpt:
      "excerpt excerpt excerpt excerpt excerpt excerpt excerpt excerpt 2",
    date: "2021-03-02",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}
