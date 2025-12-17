package tn.esprit.examen.nomPrenomClasseExamen.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tn.esprit.examen.nomPrenomClasseExamen.entities.User;
import tn.esprit.examen.nomPrenomClasseExamen.services.UsersModule.AuthService;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    @Lazy
    private final AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        final String path = request.getRequestURI();
        if (path.startsWith("/tests/auth/") || path.startsWith("/tests/user/") ||
                path.startsWith("/tests/friendRequests/") || path.startsWith("/tests/pic/") ||
                path.startsWith("/tests/ws/") || path.startsWith("/tests/v3/api-docs/") ||
                path.startsWith("/tests/swagger-ui/")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);
        System.out.println("Received token: " + token);

        try {
            Long userId = jwtUtil.extractUserId(token);
            System.out.println("Extracted userId from token: " + userId);

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = authService.loadUserById(userId);
                if (user == null) {
                    System.out.println("User not found for ID: " + userId);
                }
                if (user != null && jwtUtil.isTokenValid(token, user)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, null, Collections.emptyList());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("Authentication set for user ID: " + userId);
                } else {
                    System.out.println("Invalid token or user mismatch");
                }
            }
        } catch (Exception e) {
            System.out.println("Exception in JWT filter: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}