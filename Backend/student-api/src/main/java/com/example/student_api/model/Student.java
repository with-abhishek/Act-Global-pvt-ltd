package com.example.student_api.model;

public class Student {
   private int id;
   private String name;
   private int age ;
   private String gender;
   private String email;
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getAge() {
	return age;
}
public void setAge(int age) {
	this.age = age;
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
@Override
public String toString() {
	return "Student [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + ", email=" + email + "]";
}
public Student(int id, String name, int i, String gender, String email) {
	super();
	this.id = id;
	this.name = name;
	this.age = i;
	this.gender = gender;
	this.email = email;
}
public Student() {
	super();
}
   
   
   
}
