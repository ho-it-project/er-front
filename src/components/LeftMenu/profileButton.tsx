import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link href="/profile">
      <div className="h-[8rem] w-[8rem] cursor-pointer rounded-3xl bg-gray drop-shadow-2xl"></div>
    </Link>
  );
}
