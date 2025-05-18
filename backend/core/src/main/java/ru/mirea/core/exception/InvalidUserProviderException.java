package ru.mirea.core.exception;

public class InvalidUserProviderException extends RuntimeException {
    public InvalidUserProviderException(String message) {
        super(message);
    }
}
