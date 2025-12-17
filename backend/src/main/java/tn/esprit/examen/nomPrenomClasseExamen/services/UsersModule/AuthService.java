package tn.esprit.examen.nomPrenomClasseExamen.services.UsersModule;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.controllers.UsersModule.VerificationCodeGenerator;
import tn.esprit.examen.nomPrenomClasseExamen.entities.User;
import tn.esprit.examen.nomPrenomClasseExamen.entities.UserVerification;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UsersModule.IUserRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UsersModule.IUsersModuleUserVerificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.beans.factory.annotation.Value;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IUsersModuleUserVerificationRepository verificationRepository;

    @Autowired
    @Qualifier("userEmailService")
    private final EmailService emailService;
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loadUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        return user;
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public User loadUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void sendOtpByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Utilisateur introuvable !");
        }

        String code = VerificationCodeGenerator.generateVerificationCode();

        UserVerification verification = verificationRepository.findByEmail(email);
        if (verification == null) {
            verification = new UserVerification();
            verification.setEmail(email);
        }

        verification.setVerificationCode(code);
        verificationRepository.save(verification);

        emailService.sendVerificationEmail(email, code);
    }

    public void resetPassword(String email, String otp, String newPassword) {
        UserVerification verification = verificationRepository.findByEmail(email);
        if (verification == null || !verification.getVerificationCode().trim().equalsIgnoreCase(otp.trim())) {
            throw new RuntimeException("Code de vérification invalide");
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        verificationRepository.delete(verification);
    }


    public void resetPasswordWithoutOtp(String email, String newPassword) {
    }
}
