import Link from "next/link";

export default function Footer(props) {
  return (
    <nav>
        <Link href="/" legacyBehavior>
          <a>Movies</a>
        </Link>
        <Link href="/people" legacyBehavior>
          <a>People</a>
        </Link>
      </nav>
  );
}
