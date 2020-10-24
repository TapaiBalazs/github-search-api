export interface RawSearchForm {
  login: string;
  email: string;
  name: string;
  repos: number;
  repoQualifier: 'GT' | 'LT';
  followers: number;
  followerQualifier: 'GT' | 'LT' | 'GTOE' | 'LTOE';
  location: string;
  created: Date;
  createdQualifier: 'GT' | 'LT';
}

export interface SearchButtonEvent {
  isSearchInProgress: boolean;
  formIsDirty: boolean;
}
