package com.ecommerce.auth.dto.response;

public record JwtResponse(String accessToken, String tokenType, String email) {
}
