package com.upnxtblog.samples.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upnxtblog.samples.domain.Role;


public interface RoleRepository extends JpaRepository<Role, Long>{
	public Role findByName(String name);
}
