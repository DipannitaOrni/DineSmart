package com.eva_oarisa_orni.springboot_backend.exception;

public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message) {
        super(message); // Pass the message to the parent (RuntimeException)
    }
}

