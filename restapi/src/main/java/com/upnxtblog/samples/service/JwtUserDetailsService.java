package com.upnxtblog.samples.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.upnxtblog.samples.dao.UserRepository;
import com.upnxtblog.samples.domain.Role;
import com.upnxtblog.samples.domain.User;

//@Service uncomment if use this as bean to fetch user from db
@Transactional
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


		User user = userRepository.findByName(username);
		if (user == null)
			throw new UsernameNotFoundException(username);
		System.out.println("inside user detail service");
		Set<GrantedAuthority> ga = new HashSet<>();

		for (Role role : user.getRoles())
			// create authority by passing the role's name
			ga.add(new SimpleGrantedAuthority(role.getName()));
		return new org.springframework.security.core.userdetails.User(user.getName(), user.getPw(), ga);
	}
	
}
