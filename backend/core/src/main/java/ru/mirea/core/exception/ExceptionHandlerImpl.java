package ru.mirea.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerImpl {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleAnyException(Exception ex) {
        return Map.of(
                "timestamp", LocalDateTime.now(),
                "error", ex.getClass().getSimpleName(),
                "message", ex.getMessage()
        );
    }
}
