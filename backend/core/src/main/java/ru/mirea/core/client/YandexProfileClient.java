package ru.mirea.core.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import ru.mirea.core.dto.auth.YandexProfileResponse;

@Component
public class YandexProfileClient {

    private final String url;
    private final RestClient restClient;

    public YandexProfileClient(
            @Value("${yandex.profile.url}") String url,
            RestClient.Builder builder
    ) {
        this.url = url;
        this.restClient = builder.build();
    }

    public YandexProfileResponse getProfile(String accessToken) {
        return restClient.get()
                .uri(url)
                .header(HttpHeaders.AUTHORIZATION, "OAuth " + accessToken)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(YandexProfileResponse.class);
    }
}
