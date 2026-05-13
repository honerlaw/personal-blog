import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");
const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  published?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  repo?: string;
  featured?: boolean;
  order?: number;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllPosts(): Post[] {
  ensureDirectoryExists(postsDirectory);
  
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: stats.text,
      };
    })
    .filter((post) => post.frontmatter.published !== false)
    .sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  ensureDirectoryExists(postsDirectory);
  
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllProjects(): Project[] {
  ensureDirectoryExists(projectsDirectory);
  
  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as ProjectFrontmatter,
        content,
      };
    })
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));

  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  ensureDirectoryExists(projectsDirectory);
  
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}
