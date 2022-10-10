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
      <div className="post-date">Posted on {frontmatter.date}</div>
      <h3>{frontmatter.title}</h3>
      <p>{frontmatter.description}</p>
      <Link href={`/${slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  )
}
