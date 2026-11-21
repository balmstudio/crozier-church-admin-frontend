export function getAuthAppUrl(): string {
  const url = (import.meta.env.VITE_AUTH_APP_URL ?? "").trim();

  if (!url) {
    throw new Error(
      "VITE_AUTH_APP_URL is not set. Set it to the auth app origin (e.g. https://stagingauth.crozierapp.com) and rebuild, since VITE_* values are baked in at build time.",
    );
  }

  if (!/^https?:\/\//.test(url)) {
    throw new Error(`VITE_AUTH_APP_URL must start with http:// or https://, got "${url}".`);
  }
  return url.replace(/\/+$/, "");
}

export function buildLoginRedirect(): string {
  return `${getAuthAppUrl()}/?redirect=${encodeURIComponent(window.location.href)}`;
}

export function redirectToLogin(): void {
  if (import.meta.env.DEV) {
    if (window.location.pathname === "/dev-login") return;
    window.location.assign(`/dev-login?redirect=${encodeURIComponent(window.location.href)}`);
    return;
  }
  window.location.assign(buildLoginRedirect());
}
