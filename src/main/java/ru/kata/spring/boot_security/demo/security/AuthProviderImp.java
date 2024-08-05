package ru.kata.spring.boot_security.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.Set;

@Component
public class AuthProviderImp implements AuthenticationProvider {

    private final UserService userDetailsService;

    @Autowired
    public AuthProviderImp(UserService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    @Transactional
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();

        UserDetails personalDetails = userDetailsService.loadUserByUsername(username);

        String password = authentication.getCredentials().toString();

        if(!password.equals(personalDetails.getPassword()))
            throw new BadCredentialsException("Incorrect Password!");

        Set<Role> roles = userDetailsService.findByUsername(username).get().getRoles();

        return new UsernamePasswordAuthenticationToken(personalDetails,password,
               roles);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
