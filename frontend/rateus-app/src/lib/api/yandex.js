export function yandexOAuthRedirect() {
  const YANDEX_CLIENT_ID = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;
  const REDIRECT_URI = `${
    process.env.NEXT_PUBLIC_RATEUS_URL || "http://localhost:3000"
  }/oauth/callback/yandex`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: YANDEX_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "login:email login:info login:avatar",
  });

  window.location.href =
    "https://oauth.yandex.ru/authorize?" + params.toString();
}
