package com.studentAPI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name = "Courses_table")
@Data
public class Courses {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String course_name;
	private Long course_fees;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public Long getCourse_fees() {
		return course_fees;
	}
	public void setCourse_fees(Long course_fees) {
		this.course_fees = course_fees;
	}
	@Override
	public String toString() {
		return "Course [id=" + id + ", course_name=" + course_name + ", course_fees=" + course_fees + "]";
	}
	
	
	
}
