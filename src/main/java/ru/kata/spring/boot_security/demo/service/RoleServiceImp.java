package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.security.PersonDetails;
import ru.kata.spring.boot_security.demo.security.Role;

import java.util.List;
import java.util.Optional;

@Service
@EnableTransactionManagement
public class RoleServiceImp implements RoleService {
    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImp(RoleDao roleDao) {
        this.roleDao = roleDao;

    }
    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleDao.findById(id);
    }

    @Override
    @Transactional
    public Role save(Role role) {
        return roleDao.save(role);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        roleDao.deleteById(id);
    }

}
