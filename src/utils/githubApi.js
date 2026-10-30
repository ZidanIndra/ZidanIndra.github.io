/**
 * GitHub REST API Direct Commit Engine
 * Allows committing changes directly to the GitHub repository from the browser via PAT
 */

function toBase64(input) {
  if (typeof window !== 'undefined' && window.btoa) {
    // UTF-8 safe browser encoding
    return window.btoa(unescape(encodeURIComponent(input)));
  }
  return Buffer.from(input, 'utf-8').toString('base64');
}

export async function getFileFromGitHub({
  token,
  repoOwner = 'ZidanIndra',
  repoName = 'ZidanIndra.github.io',
  path,
  branch = 'master',
}) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branch}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch file: ${response.statusText}`);
  }

  return response.json();
}

export async function commitFileToGitHub({
  token,
  repoOwner = 'ZidanIndra',
  repoName = 'ZidanIndra.github.io',
  path,
  content, // plain string or already base64 encoded
  isBase64 = false,
  message,
  sha,
  branch = 'master',
}) {
  if (!token) {
    throw new Error('GitHub Personal Access Token is required to commit changes.');
  }

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
  const base64Content = isBase64 ? content : toBase64(content);

  const payload = {
    message: message || `Update ${path} via Portfolio Admin CMS`,
    content: base64Content,
    branch,
    ...(sha ? { sha } : {}),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Commit failed with HTTP ${response.status}`);
  }

  return response.json();
}
