export default function RequsetBox() {
  return (
    <div className="relative mx-auto mb-[2rem] h-[19rem] w-[38rem] rounded-xl bg-white px-[2rem] py-[1.5rem] text-[1.8rem] font-[600]">
      <span className="absolute -right-3 -top-3 h-[2.1rem] w-[2.1rem] rounded-full bg-main"></span>
      <div className="mb-[1rem] flex justify-between">
        <p>403829</p>
        <p className="text-red">2:14</p>
      </div>
      <div className="mb-[1rem] flex justify-between">
        <p>김*종 / 남 / 19세</p>
        <p>서울 119 안전센터</p>
      </div>
      <div className="mt-[5rem]">
        <p>복통, 식은땀, 발열, 구토</p>
        <p>복통, 식은땀, 발열, 구토</p>
      </div>
    </div>
  );
}
