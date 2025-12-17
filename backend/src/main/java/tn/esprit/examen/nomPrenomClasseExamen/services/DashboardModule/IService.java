package tn.esprit.examen.nomPrenomClasseExamen.services.DashboardModule;

import java.util.List;

public interface IService<T> {
    List<T> getAll();
    T save(T t);
    void delete(Long id);
}