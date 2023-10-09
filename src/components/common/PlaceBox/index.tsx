interface PlaceBox {
  place: string;
  ClickedChagneMessage?: () => void;
}

export default function PlaceBox({ place, ClickedChagneMessage }: PlaceBox) {
  return (
    <div className="flex h-[9rem] w-full items-center justify-between gap-[2rem] rounded-2xl bg-white px-[3rem] py-[2rem] drop-shadow-sm">
      <h1 className="text-[2.4rem] font-[700] text-main">{place}</h1>
      <button
        className="min-h-[3rem] min-w-[3rem] rounded-full bg-main30"
        onClick={ClickedChagneMessage}
      ></button>
    </div>
  );
}
