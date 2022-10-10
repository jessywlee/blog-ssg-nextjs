import Link from "next/link"

export interface IPost {
  slug: string;
  frontmatter: {
    categories: string[];
    date: string;
    description: string;
    tags: string[];
    title: string;
  };
}

export default function Post({slug, frontmatter}: IPost) {
  
  return (
    <div className="card">

      <div className="post-date">{ frontmatter.date }</div>
    </div>
  )
}
