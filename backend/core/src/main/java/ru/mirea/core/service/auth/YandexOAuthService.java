package ru.mirea.core.service.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import ru.mirea.core.dto.auth.YandexProfileResponse;
import ru.mirea.core.dto.auth.YandexTokenResponse;

@Service
public class YandexOAuthService {

    @Value("${yandex.client.id}")
    private String clientId;

    @Value("${yandex.client.secret}")
    private String clientSecret;

    private final String url = "https://oauth.yandex.ru/token";

    public YandexTokenResponse authorizeWithCode(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<YandexTokenResponse> response = restTemplate.exchange(
                url, HttpMethod.POST, request, YandexTokenResponse.class);

        return response.getBody();
    }

    public YandexProfileResponse getYandexProfile(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "OAuth " + accessToken);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<YandexProfileResponse> response = restTemplate.exchange(
                "https://login.yandex.ru/info?format=json",
                HttpMethod.GET,
                entity,
                YandexProfileResponse.class
        );

        return response.getBody();
    }

    public String getAvatarUrl(String defaultAvatarId) {
        return "https://avatars.yandex.net/get-yapic/" + defaultAvatarId + "/islands-retina-small";
    }
}
