import Link from "next/link";
import { PiCaretRightLight } from "react-icons/pi";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`text-sm text-blue-light mb-6 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-brown-dark"
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-brown-dark hover:underline underline-offset-4"
                  >
                    {item.name}
                  </Link>
                  <PiCaretRightLight
                    className="text-brown-dark/60"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
