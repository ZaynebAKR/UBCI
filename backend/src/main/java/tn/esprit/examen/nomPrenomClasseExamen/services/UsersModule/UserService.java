    package tn.esprit.examen.nomPrenomClasseExamen.services.UsersModule;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import tn.esprit.examen.nomPrenomClasseExamen.entities.User;
    import tn.esprit.examen.nomPrenomClasseExamen.repositories.UsersModule.IUserRepository;

    import java.util.List;
    import java.util.Optional;

    @Service("userService")
    public class UserService implements IUserService {

        @Autowired
        private IUserRepository userRepository;

        @Override
        public User authenticateUser(String email, String password) {
            User user = userRepository.findByEmail(email);

            if (user != null) {
                if (password.equals(user.getPassword())) {
                    return user;
                }
            }
            return null;
        }

        @Override
        public List<User> retrieveAllUser() {
            return userRepository.findAll();
        }

        @Override
        public User addUser(User user) {
            return userRepository.save(user);
        }

        @Override
        public User updateUser(User user) {
            return userRepository.save(user);
        }

        @Override
        public User retrieveUser(long idUser) {
            return userRepository.findById(idUser)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + idUser));
        }

        @Override
        public void removeUser(long idUser) {
            userRepository.deleteById(idUser);
        }

        @Override
        public User findByEmail(String email) {
            return userRepository.findByEmail(email);
        }

    }
