import EMStest from "@/components/pages/home/EMStest";
import ERtest from "@/components/pages/home/ERtest";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="bg-slate-100 text-4xl font-bold">asdfasdfsdfdsfsdf</h1>
      <dialog></dialog>
      <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"></button>
      <ERtest />
      <br />
      <EMStest />
      {/* <ThemeSwitcher /> */}
    </main>
  );
}
