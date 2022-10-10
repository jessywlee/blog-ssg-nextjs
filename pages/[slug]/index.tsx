import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { IPost } from "../../components/Post";
import Link from "next/link";
import { GetStaticProps } from "next";

interface ContentProps extends IPost {
  content: string;
}

export default function PostPage({ frontmatter: { 
  date, title
}, content }: ContentProps) {
  return (
    <>
      <Link href="/">
        <a className="btn">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("__posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const markdownWithMeta = fs.readFileSync(
    path.join("__posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
};
