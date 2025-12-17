package tn.esprit.examen.nomPrenomClasseExamen.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import tn.esprit.examen.nomPrenomClasseExamen.entities.RoleType;
import tn.esprit.examen.nomPrenomClasseExamen.entities.User;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final long expirationMs = 86400000;
    private final String SECRET_KEY = "ton-secret-base64-encode-ou-une-longue-phrase-de-256-bits";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(User user) {
        if (user.getRoleType() == null) {
            user.setRoleType(RoleType.CLIENT);
            user.setRoleType(RoleType.CLIENT);
        }

        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .claim("role", user.getRoleType().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();

        System.out.println("Generated token: " + token);
        return token;
    }


    public Long extractUserId(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.get("id", Integer.class).longValue();
        } catch (Exception e) {
            System.out.println("Error extracting userId from token: " + e.getMessage());
            throw e;
        }
    }

    public String extractEmail(String token) {
        try {
            Claims claims = getClaims(token);
            String email = claims.getSubject();
            System.out.println("Extracted email from token: " + email);
            return email;
        } catch (Exception e) {
            System.out.println("Error extracting email from token: " + e.getMessage());
            throw e;
        }
    }

    public boolean isTokenValid(String token, User user) {
        final String email = extractEmail(token);
        boolean isValid = email.equals(user.getEmail()) && !isTokenExpired(token);
        System.out.println("Token valid: " + isValid);
        return isValid;
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
    }
}
