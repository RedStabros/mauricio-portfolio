export interface RepoLanguage {
  name: string;
  color: string;
}

export interface RepoLicense {
  spdxId: string | null;
  name: string | null;
  isOpenSource: boolean;
}

// Repository shape returned by /api/repos after server-side filtering.
// Private repositories always have repoUrl set to null so internal GitHub URLs stay private.
export interface SanitizedRepo {
  name: string;
  description: string | null;
  homepageUrl: string | null;
  repoUrl: string | null;
  isPrivate: boolean;
  license: RepoLicense | null;
  updatedAt: string;
  languages: RepoLanguage[];
  topics: string[];
}

export interface ReposApiResponse {
  repos: SanitizedRepo[];
  source: 'github' | 'mock';
  fetchedAt: string;
}

export interface ReposApiErrorResponse {
  error: string;
  repos: SanitizedRepo[];
}
