import EMStest from "@/components/pages/home/EMStest";
import ERtest from "@/components/pages/home/ERtest";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="bg-slate-100 text-4xl font-bold">Hellow</h1>
      <ERtest />
      <br />
      <EMStest />
    </main>
  );
}
