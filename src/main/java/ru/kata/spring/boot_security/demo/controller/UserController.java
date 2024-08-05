package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.Optional;


@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }



    @GetMapping("/user")
    public String editUser(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user = userService.findByUsername(authentication.getName());
        model.addAttribute("user", user);
        model.addAttribute("allRoles", roleService.findAll());
        return "user-edit";
    }

    @PostMapping("/users-update")
    public String updateUser(User user, RedirectAttributes redirectAttributes){
        userService.save(user);
        return "redirect:/user";
    }
    @GetMapping("/")
    public String getIndex(){
        return "index";
    }
}
