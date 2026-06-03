package com.example.pfc_navi.dto;

public class ApiResponse<T> {

    private String resultCode;
    private String message;
    private T data;

    public ApiResponse() {
    }

    public ApiResponse(String resultCode, String message, T data) {
        this.resultCode = resultCode;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>("SUCCESS", message, data);
    }

    public static <T> ApiResponse<T> validationError(String message, T data) {
        return new ApiResponse<>("VALIDATION_ERROR", message, data);
    }

    public String getResultCode() {
        return resultCode;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }
}