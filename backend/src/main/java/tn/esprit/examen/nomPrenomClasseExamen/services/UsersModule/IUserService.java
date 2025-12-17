package tn.esprit.examen.nomPrenomClasseExamen.services.UsersModule;

import tn.esprit.examen.nomPrenomClasseExamen.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> retrieveAllUser();
    User addUser (User users);
    User updateUser (User user);
    User retrieveUser(long idUser);
    void removeUser(long idUser);
    User findByEmail(String email);
    User authenticateUser(String email, String password);
}
