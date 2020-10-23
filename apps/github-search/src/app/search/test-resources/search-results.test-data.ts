import { UserDetail, UserSearchListItem, UserSearchListResult } from '../interfaces/user-search.interfaces';

export const MOCK_USER_1: UserSearchListItem = {
  'login': 'testuser',
  'id': 1024025,
  'node_id': 'MDQ6VXNlcjEwMjQwMjU=',
  'avatar_url': 'https://avatars0.githubusercontent.com/u/1024025?v=4',
  'gravatar_id': '',
  'url': 'https://api.github.com/users/testuser',
  'html_url': 'https://github.com/testuser',
  'followers_url': 'https://api.github.com/users/testuser/followers',
  'following_url': 'https://api.github.com/users/testuser/following{/other_user}',
  'gists_url': 'https://api.github.com/users/testuser/gists{/gist_id}',
  'starred_url': 'https://api.github.com/users/testuser/starred{/owner}{/repo}',
  'subscriptions_url': 'https://api.github.com/users/testuser/subscriptions',
  'organizations_url': 'https://api.github.com/users/testuser/orgs',
  'repos_url': 'https://api.github.com/users/testuser/repos',
  'events_url': 'https://api.github.com/users/testuser/events{/privacy}',
  'received_events_url': 'https://api.github.com/users/testuser/received_events',
  'type': 'User',
  'site_admin': false,
  'score': 1
};

export const MOCK_USER_2: UserSearchListItem = {
  'login': 'anotheruser',
  'id': 1024025,
  'node_id': 'MDQ6VXNlcjEwMjQwMjU=',
  'avatar_url': 'https://avatars0.githubusercontent.com/u/1024025?v=4',
  'gravatar_id': '',
  'url': 'https://api.github.com/users/anotheruser',
  'html_url': 'https://github.com/anotheruser',
  'followers_url': 'https://api.github.com/users/anotheruser/followers',
  'following_url': 'https://api.github.com/users/anotheruser/following{/other_user}',
  'gists_url': 'https://api.github.com/users/anotheruser/gists{/gist_id}',
  'starred_url': 'https://api.github.com/users/anotheruser/starred{/owner}{/repo}',
  'subscriptions_url': 'https://api.github.com/users/anotheruser/subscriptions',
  'organizations_url': 'https://api.github.com/users/anotheruser/orgs',
  'repos_url': 'https://api.github.com/users/anotheruser/repos',
  'events_url': 'https://api.github.com/users/anotheruser/events{/privacy}',
  'received_events_url': 'https://api.github.com/users/anotheruser/received_events',
  'type': 'User',
  'site_admin': false,
  'score': 1
};

export const MOCK_USER_DETAIL_1: UserDetail = {
  ...MOCK_USER_1,
  bio: 'I die hard.',
  name: 'John McClane',
  blog: 'nakatomi.tower',
  following: 6,
  followers: 9,
  public_gists: 7,
  public_repos: 3,
  company: 'NYPD',
  location: 'San Francisco',
}

export const MOCK_USER_SEARCH_RESULT: UserSearchListResult = {
  'total_count': 2,
  'incomplete_results': false,
  'items': [
    MOCK_USER_1,
    MOCK_USER_2
  ]
};

