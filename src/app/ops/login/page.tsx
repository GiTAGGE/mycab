export default async function OpsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message =
    error === "unconfigured"
      ? "Set OPS_PASSWORD and OPS_SESSION_SECRET before signing in."
      : error
        ? "That password did not match."
        : null;

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <p className="text-sm font-medium text-accent-dark">Internal</p>
      <h1 className="display mt-2 text-4xl">Sign in</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Cities and fares stay in git. This door is only for leads, campaigns, and measurement.
      </p>
      {message ? <p className="mt-4 text-sm text-accent">{message}</p> : null}
      <form method="post" action="/api/ops/session" className="mt-6 space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-2xl border border-line bg-card px-4 py-3"
          />
        </label>
        <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">
          Continue
        </button>
      </form>
    </section>
  );
}
