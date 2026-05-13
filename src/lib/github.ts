export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
}

const GITHUB_USER = "honerlaw";

export async function getPublicRepos(): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&direction=desc&per_page=100&type=owner`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return [];
    }

    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.fork && !r.archived);
  } catch {
    return [];
  }
}
