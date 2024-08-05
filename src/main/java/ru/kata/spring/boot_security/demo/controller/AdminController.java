package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Optional;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/users")
    public String getUsers( ModelMap model){
        model.addAttribute("users", userService.findAll());
        return "user-list";
    }

    @GetMapping("/user-create")
    public String createUserForm(ModelMap model){
        model.addAttribute("user",new User());
        model.addAttribute("allRoles",roleService.findAll());
        return "user-create";
    }

    @PostMapping("/user-create")
    public String addUser(User user){
        userService.save(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/user-delete/{id}")
    public String removeUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return "redirect:/admin/users";
    }

    @GetMapping("/users/{id}")
    public String editUser(@PathVariable("id") Long id, Model model) {
        Optional<User> user = userService.findById(id);
        model.addAttribute("user",user);
        model.addAttribute("allRoles", roleService.findAll());
        return "admin-user-edit";
    }
    @GetMapping("/")
    public String editAdmin(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user = userService.findByUsername(authentication.getName());
        model.addAttribute("user", user);
        model.addAttribute("allRoles", roleService.findAll());
        return "admin-user-edit";
    }

    @PostMapping("/users-update")
    public String updateUser(User user){
        userService.save(user);
        return "redirect:/users";
    }
}
