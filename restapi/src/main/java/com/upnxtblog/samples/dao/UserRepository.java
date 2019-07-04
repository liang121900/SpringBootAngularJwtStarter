package com.upnxtblog.samples.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upnxtblog.samples.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByName(String username);
	
}
