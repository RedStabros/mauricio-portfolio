import type { RepoLanguage, RepoLicense, ReposApiErrorResponse, ReposApiResponse, SanitizedRepo } from '../../src/types/github';

interface Env {
  GITHUB_TOKEN?: string;
  GITHUB_USERNAME?: string;
  ENVIRONMENT?: string;
}

interface GitHubGraphQLLanguageNode {
  name: string;
  color: string | null;
}

interface GitHubGraphQLTopicNode {
  topic: {
    name: string;
  };
}

interface GitHubGraphQLRepoNode {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  isPrivate: boolean;
  isArchived: boolean;
  pushedAt: string | null;
  updatedAt: string;
  licenseInfo: {
    spdxId: string | null;
    name: string | null;
  } | null;
  owner: {
    login: string;
  };
  languages: {
    nodes: GitHubGraphQLLanguageNode[];
  };
  repositoryTopics: {
    nodes: GitHubGraphQLTopicNode[];
  };
}

interface GitHubGraphQLResponse {
  data?: {
    viewer?: {
      repositories?: {
        nodes: GitHubGraphQLRepoNode[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const PORTFOLIO_TOPIC = 'portfolio';
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

// Pull owned public and private repos sorted by last code push (pushedAt),
// so metadata edits like adding topics do not fake recent code activity.
const REPOS_QUERY = /* GraphQL */ `
  query PortfolioRepositories {
    viewer {
      repositories(
        first: 100
        ownerAffiliations: [OWNER]
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          homepageUrl
          isPrivate
          isArchived
          pushedAt
          updatedAt
          licenseInfo {
            spdxId
            name
          }
          owner {
            login
          }
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
            }
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }
`;

// Cache live GitHub responses at the Cloudflare edge for 1 hour and serve
// stale data for up to 24 hours while refreshing in the background.
const EDGE_CACHE_HEADERS: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
};

// Error responses and local fallback payloads should never be cached.
const NO_STORE_HEADERS: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
};

const HEX_COLOR_RE = /^#[0-9A-Fa-f]{6}$/;
const UPSTREAM_TIMEOUT_MS = 8000;

// Only OSI-approved open source SPDX identifiers receive the "Open Source" badge.
// Source-available or non-commercial licenses (such as PolyForm Noncommercial) are labeled separately.
const OSI_OPEN_SOURCE_SPDX = new Set([
  'MIT',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  'MPL-2.0',
  'GPL-2.0',
  'GPL-3.0',
  'LGPL-2.1',
  'LGPL-3.0',
  'AGPL-3.0',
  'Unlicense',
  '0BSD',
]);

function normalizeLicense(info: GitHubGraphQLRepoNode['licenseInfo']): RepoLicense | null {
  if (!info) return null;
  const spdxId = info.spdxId?.trim() || null;
  const name = info.name?.trim() || null;
  if (!spdxId && !name) return null;
  const isOpenSource = Boolean(spdxId && OSI_OPEN_SOURCE_SPDX.has(spdxId));
  return { spdxId, name, isOpenSource };
}

// Sample repositories used only during local development when no token is configured
// or GitHub is unreachable. Never returned on live Cloudflare traffic.
function getLocalDevMockRepos(): SanitizedRepo[] {
  const now = Date.now();
  const daysAgo = (days: number) => new Date(now - days * 86_400_000).toISOString();

  return [
    {
      name: 'ciudad-friki-mobile',
      description:
        'Cross-platform React Native & Expo mobile client for Ciudad Friki with QR attendance scanning, geolocation check-ins, and gamified trivia rewards.',
      homepageUrl: 'https://play.google.com/store/apps/details?id=com.redstabros.ciudadfriki',
      repoUrl: null,
      isPrivate: true,
      license: null,
      updatedAt: daysAgo(0),
      languages: [
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'Kotlin', color: '#A97BFF' },
        { name: 'JavaScript', color: '#F1E05A' },
      ],
      topics: ['react-native', 'expo', 'google-play', 'production'],
    },
    {
      name: 'mauricio-portfolio',
      description:
        'Precision-engineered developer portfolio built with Astro, Tailwind CSS v4, and Cloudflare Pages Functions with edge-cached GitHub GraphQL sync.',
      homepageUrl: 'https://mauricio-portfolio-z11.pages.dev',
      repoUrl: 'https://github.com/RedStabros/mauricio-portfolio',
      isPrivate: false,
      license: { spdxId: 'MIT', name: 'MIT License', isOpenSource: true },
      updatedAt: daysAgo(1),
      languages: [
        { name: 'Astro', color: '#FF5D01' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'CSS', color: '#563D7C' },
      ],
      topics: ['astro', 'cloudflare-pages', 'tailwindcss', 'edge'],
    },
    {
      name: 'apps-4all',
      description:
        'A project for free apps — no ads, no telemetry, completely offline, 100% privacy.',
      homepageUrl: 'https://apps-4all.pages.dev/es/',
      repoUrl: 'https://github.com/RedStabros/apps-4all',
      isPrivate: false,
      license: { spdxId: 'NOASSERTION', name: 'PolyForm Noncommercial 1.0.0', isOpenSource: false },
      updatedAt: daysAgo(0),
      languages: [
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'Astro', color: '#FF5D01' },
        { name: 'C++', color: '#F34B7D' },
      ],
      topics: ['apk', 'react-native'],
    },
  ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

function isLocalDevelopment(request: Request, env: Env): boolean {
  // Cloudflare attaches cf-ray to all live edge requests, so its presence blocks dev mocks.
  if (request.headers.has('cf-ray')) return false;
  if (env.ENVIRONMENT === 'development') return true;
  try {
    const { hostname } = new URL(request.url);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
  } catch {
    return false;
  }
}

// Accept only 6-digit hex colors so external values cannot inject CSS into style attributes.
function sanitizeHexColor(rawColor: string | null): string {
  if (!rawColor) return '#A1A1AA';
  const trimmed = rawColor.trim();
  return HEX_COLOR_RE.test(trimmed) ? trimmed : '#A1A1AA';
}

// Allow only HTTPS GitHub repository URLs for public entries.
function normalizeGitHubRepoUrl(rawUrl: string | null): string | null {
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol === 'https:' && parsed.hostname === 'github.com') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

// Normalize demo links and reject non-HTTP schemes like javascript: or data:.
function normalizeHomepageUrl(rawUrl: string | null): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

// Strip internal fields before sending repository data to the browser.
// Private repos always drop repoUrl and only expose public metadata.
function sanitizeRepository(node: GitHubGraphQLRepoNode): SanitizedRepo {
  const isPrivate = Boolean(node.isPrivate);
  const languages: RepoLanguage[] = (node.languages?.nodes ?? []).map((lang) => ({
    name: lang.name,
    color: sanitizeHexColor(lang.color),
  }));
  const topics: string[] = (node.repositoryTopics?.nodes ?? [])
    .map((entry) => entry.topic.name.toLowerCase())
    .filter((topic) => topic !== PORTFOLIO_TOPIC);

  return {
    name: node.name,
    description: node.description?.trim() || null,
    homepageUrl: normalizeHomepageUrl(node.homepageUrl),
    repoUrl: isPrivate ? null : normalizeGitHubRepoUrl(node.url),
    isPrivate,
    license: isPrivate ? null : normalizeLicense(node.licenseInfo),
    // Prefer pushedAt so the UI reflects real code commits instead of topic/settings edits.
    updatedAt: node.pushedAt ?? node.updatedAt,
    languages,
    topics,
  };
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const isLocalDev = isLocalDevelopment(request, env);
  const token = env.GITHUB_TOKEN?.trim();
  const expectedUsername = env.GITHUB_USERNAME?.trim().toLowerCase();

  if (!token) {
    if (isLocalDev) {
      const payload: ReposApiResponse = {
        repos: getLocalDevMockRepos(),
        source: 'mock',
        fetchedAt: new Date().toISOString(),
      };
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: NO_STORE_HEADERS,
      });
    }

    const errorPayload: ReposApiErrorResponse = {
      error: 'GitHub synchronization is not configured.',
      repos: [],
    };
    return new Response(JSON.stringify(errorPayload), {
      status: 503,
      headers: NO_STORE_HEADERS,
    });
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        'User-Agent': 'mauricio-portfolio-edge/1.0',
      },
      body: JSON.stringify({ query: REPOS_QUERY }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL HTTP ${response.status}`);
    }

    const json = (await response.json()) as GitHubGraphQLResponse;

    if (json.errors && json.errors.length > 0) {
      throw new Error(`GitHub GraphQL error: ${json.errors[0].message}`);
    }

    const rawNodes = json.data?.viewer?.repositories?.nodes ?? [];

    const sanitizedRepos = rawNodes
      .filter((node) => {
        if (node.isArchived) return false;
        if (expectedUsername && node.owner.login.toLowerCase() !== expectedUsername) {
          return false;
        }
        const topics = node.repositoryTopics?.nodes ?? [];
        return topics.some((t) => t.topic.name.toLowerCase() === PORTFOLIO_TOPIC);
      })
      .map(sanitizeRepository)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    const payload: ReposApiResponse = {
      repos: sanitizedRepos,
      source: 'github',
      fetchedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: EDGE_CACHE_HEADERS,
    });
  } catch (err) {
    const safeMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/repos] Failed to fetch GitHub repositories:', safeMessage);

    if (isLocalDev) {
      const payload: ReposApiResponse = {
        repos: getLocalDevMockRepos(),
        source: 'mock',
        fetchedAt: new Date().toISOString(),
      };
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: NO_STORE_HEADERS,
      });
    }

    const errorPayload: ReposApiErrorResponse = {
      error: 'Unable to retrieve repositories at this time.',
      repos: [],
    };
    return new Response(JSON.stringify(errorPayload), {
      status: 502,
      headers: NO_STORE_HEADERS,
    });
  }
};
