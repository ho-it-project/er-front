"use client";

import * as Apis from "hoit-server-api/api/functional";
import React from "react";

const LoginForm = () => {
  const apiTest = async () => {
    const a = await Apis.getHello({
      host: "http://localhost:4000/api",
    });
    console.log(a);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${
            DOMAIN
              ? `${PROTOCOL}://${DOMAIN}${KAKAO_REDIRECT_URI}`
              : KAKAO_REDIRECT_URL
          }&response_type=code`}
        >
          <Image
            src="/kakao_login_large_wide.png"
            alt="kakao_login_large_wide"
            width={420}
            height={200}
            priority
          />
        </Link> */}
        <button onClick={apiTest}> asdf</button>
      </div>
      <div className="my-5 text-center text-lg text-gray-400">or</div>

      {/* <a
        className="mt-2 inline-block text-gray-400"
        onClick={() => setShowPasswordModal(true)}
      >
        비밀번호 찾기
      </a>
      <DefaultModal
        title="비밀번호 찾기"
        open={showPasswordModal}
        handleHide={() => setShowPasswordModal(false)}
      >
        🔑 임시 로그인 정보는 admin / admin 입니다.
      </DefaultModal> */}
    </>
  );
};

export default React.memo(LoginForm);
