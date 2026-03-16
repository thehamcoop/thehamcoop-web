import { FOOTER, NAV_LINKS, SITE } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <span className="text-xl font-bold" style={{ color: "#164761" }}>더함 협동조합</span>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {SITE.description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">바로가기</h4>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">연락처</h4>
          <ul className="flex flex-col gap-2 text-sm text-text-secondary">
            <li>{FOOTER.address}</li>
            <li>{FOOTER.phone}</li>
            <li>{FOOTER.email}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border-default pt-6 text-center text-xs text-text-muted">
        &copy; {FOOTER.copyright}
      </div>
    </footer>
  );
}
