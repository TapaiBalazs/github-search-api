export interface UserSearchListResult {
  total_count: number;
  incomplete_results: boolean;
  items: UserSearchListItem[];
}

export interface UserSearchListItem {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User',
  site_admin: boolean;
  score: number;
}

export interface UserDetail extends UserSearchListItem {
  name: string;
  bio: string;
  blog: string;
  following: number;
  followers: number;
  public_gists: number;
  public_repos: number;
  company: string;
  location: string;
}
