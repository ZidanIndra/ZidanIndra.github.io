import { describe, it, expect, vi, beforeEach } from 'vitest';
import { commitFileToGitHub, getFileFromGitHub } from '../src/utils/githubApi.js';

describe('GitHub REST API Direct Commit Engine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('commitFileToGitHub sends PUT request with base64 encoded content and auth header', async () => {
    const mockResponse = {
      content: { sha: 'new-sha-123' },
      commit: { message: 'feat: update portfolio data' },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    globalThis.fetch = fetchMock;

    const result = await commitFileToGitHub({
      token: 'ghp_mocktoken123',
      repoOwner: 'ZidanIndra',
      repoName: 'ZidanIndra.github.io',
      path: 'src/data/portfolioData.json',
      content: JSON.stringify({ test: 'data' }),
      message: 'feat: update portfolio data',
      sha: 'old-sha-456',
      branch: 'master',
    });

    expect(fetchMock).toHaveBeenCalled();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.github.com/repos/ZidanIndra/ZidanIndra.github.io/contents/src/data/portfolioData.json');
    expect(options.method).toBe('PUT');
    expect(options.headers.Authorization).toBe('Bearer ghp_mocktoken123');
    const body = JSON.parse(options.body);
    expect(body.message).toBe('feat: update portfolio data');
    expect(body.sha).toBe('old-sha-456');
    expect(body.branch).toBe('master');
    expect(result.content.sha).toBe('new-sha-123');
  });

  it('commitFileToGitHub throws user-friendly error on non-ok status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Bad credentials' }),
    });

    await expect(
      commitFileToGitHub({
        token: 'invalid_token',
        repoOwner: 'ZidanIndra',
        repoName: 'ZidanIndra.github.io',
        path: 'test.json',
        content: '{}',
        message: 'test',
      })
    ).rejects.toThrow(/Bad credentials/);
  });
});
