interface PlaceBox {
  place: string;
}

export default function PlaceBox({ place }: PlaceBox) {
  return (
    <div className="flex h-[9rem] items-center rounded-2xl bg-white px-[3rem] py-[2rem] drop-shadow-sm">
      <h1 className="text-[2.4rem] font-[700] text-main">{place}</h1>
    </div>
  );
}
