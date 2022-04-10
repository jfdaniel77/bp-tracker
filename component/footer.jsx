import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="cntr-footer">
      Created with
      {"  "}
      <Image src="/heart.png" width="30" height="30" />
      using{" "}
      <Link href="https://nextjs.org">
        <a target="_blank">Next.js</a>
      </Link>
    </footer>
  );
}
