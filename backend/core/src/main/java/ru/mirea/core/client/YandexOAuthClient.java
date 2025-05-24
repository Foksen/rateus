package ru.mirea.core.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import ru.mirea.core.dto.auth.YandexTokenResponse;

@Component
public class YandexOAuthClient {

    private final String url;
    private final String clientId;
    private final String clientSecret;
    private final RestClient restClient;

    public YandexOAuthClient(
            @Value("${yandex.oauth.url}") String url,
            @Value("${yandex.oauth.client-id}") String clientId,
            @Value("${yandex.oauth.client-secret}") String clientSecret,
            RestClient.Builder restClientBuilder
    ) {
        this.url = url;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.restClient = restClientBuilder.build();
    }

    public YandexTokenResponse authorizeWithCode(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);

        return restClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(params)
                .retrieve()
                .body(YandexTokenResponse.class);
    }
}
