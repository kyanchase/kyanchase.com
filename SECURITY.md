# Security maintenance

The public portfolio is a static export on GitHub Pages. There are no customer
accounts, payment handlers, uploads, or application database endpoints.

## Report a problem

Send suspected vulnerabilities privately to create@kyanchase.com. Please include
the affected URL, impact, and minimal reproduction. Do not include credentials,
customer information, or destructive demonstrations in a public issue.

## Before publishing

- Install the lockfile with `npm ci --ignore-scripts`.
- Run `npm test` to build the static export and check content and script policies.
- Run `npm audit`; investigate all findings in their actual execution context.
- Publish changes through a pull request with the required build check.
- Keep Dependabot updates reviewed, including pinned GitHub Action revisions.

The static build generates per-page CSP hashes for inline framework scripts.
Do not edit exported HTML after this step or inject unreviewed third-party scripts.
The policy permits inline styles for framework compatibility, but not arbitrary
inline scripts or eval. The policy restricts forms because this portfolio has none;
review it deliberately before introducing a shop or checkout.

`public/_headers` stages additional protections for a compatible static host.
GitHub Pages does not apply it. The meta CSP cannot enforce frame-ancestors, HSTS,
nosniff, or Permissions-Policy. Verify these in live HTTP responses after a hosting
change. The initial HSTS policy is one day, without includeSubDomains or preload;
lengthen it only after confirming the deployment and subdomain requirements.

## Dependency exceptions

The alternate Sites/vinext toolchain remains available and is tested separately
with `npm run build`. It is not the public GitHub Pages deployment.

The sharp override pins 0.35.4 to address the libheif advisory while upstream
Miniflare still requests an affected version. The esbuild override is scoped to
@esbuild-kit/core-utils to remove its old vulnerable development server version.
Re-evaluate these overrides when updating the parent packages. Validate the static
build, Worker build, and database generation command when changing these pins.

## Before accepting orders

Use commerce-appropriate hosting and a hosted payment provider. Keep secret keys,
buyer addresses, order records, and print masters out of this public repository.
Confirm payment in the provider dashboard; a success-page visit is not proof of
payment. Future automated fulfillment must validate webhook signatures and handle
duplicate notifications safely. Never build payment authorization from browser data.

Account MFA, recovery, domain verification, token scopes, and registrar protection
must be checked at the account level; a passing build cannot establish them.
