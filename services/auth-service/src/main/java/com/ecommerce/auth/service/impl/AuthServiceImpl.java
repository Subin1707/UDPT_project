package com.ecommerce.auth.service.impl;

import com.ecommerce.auth.dto.request.LoginRequest;
import com.ecommerce.auth.dto.request.RegisterRequest;
import com.ecommerce.auth.dto.response.JwtResponse;
import com.ecommerce.auth.service.AuthService;
import com.ecommerce.auth.security.jwt.JwtProvider;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public JwtResponse register(RegisterRequest request) {
        return new JwtResponse(jwtProvider.generateToken(request.email()), "Bearer", request.email());
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        return new JwtResponse(jwtProvider.generateToken(request.email()), "Bearer", request.email());
    }
}
