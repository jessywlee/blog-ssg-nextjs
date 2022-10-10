import type { NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post, { IPost } from '../components/Post'
interface PostList {
  posts: IPost[]
}

const Home = ({posts}: PostList) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} slug={post.slug} frontmatter={post.frontmatter} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //Get files from __posts dir
  const files = fs.readdirSync(path.join('__posts'));

  //Get slug and frontmatter from posts
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('__posts', filename),
      'utf-8'
    )
    const {data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      posts
    }
  }
}

export default Home
