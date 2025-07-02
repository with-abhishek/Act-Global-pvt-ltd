package com.studentAPI.model;

import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;


@Entity(name = "StudentTable")
@Data
public class Student {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
//	{ if you wanna be gererate a sequence pattern in an table	  }
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom_seq")
	@SequenceGenerator(name = "custom_seq", sequenceName = "cs_branch", initialValue = 20250101, allocationSize = 1)

	private Long id ;
	private String name;
	private String gender;
	private String email;
	private String mobileNo;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Courses> courses;
	
	

	public List<Courses> getCourses() {
		return courses;
	}
	public void setCourses(List<Courses> courses) {
		this.courses = courses;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", gender=" + gender + ", email=" + email + ", mobileNo="
				+ mobileNo + ", courses=" + courses + "]";
	}
}
	