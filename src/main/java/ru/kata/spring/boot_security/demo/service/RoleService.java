package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.security.Role;
import java.util.List;
import java.util.Optional;

public interface RoleService {
    List<Role> findAll();
    Optional<Role> findById(Long id);
    Role save(Role user);
    void deleteById(Long id);

}
