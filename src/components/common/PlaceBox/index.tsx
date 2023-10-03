"use client";

interface PlaceBox {
  place: string;
}

export default function PlaceBox({ place }: PlaceBox) {
  // const [windowWidth, setWindowWitdh] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log(window.innerWidth);

  //     setWindowWitdh(window.innerWidth);
  //   };

  //   handleResize();
  // });

  return (
    <div className="flex h-[9rem] items-center rounded-2xl bg-white px-[3rem] py-[2rem] drop-shadow-sm">
      <h1 className="text-[2.4rem] font-[700] text-main">{place}</h1>
    </div>
  );
}
