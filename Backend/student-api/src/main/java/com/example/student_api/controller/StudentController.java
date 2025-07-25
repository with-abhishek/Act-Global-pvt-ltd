package com.example.student_api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_api.model.Student;

@RestController
@RequestMapping("/students")
public class StudentController {
	private List<Student> studentList = new ArrayList<>();

//	    {
//	        studentList = new ArrayList<>();
//	        studentList.add(new Student(1, "Alice", 20, "Female", "alice@example.com"));
//	        studentList.add(new Student(2, "Bob", 22, "Male", "bob@example.com"));
//	        studentList.add(new Student(3, "Charlie", 21, "Male", "charlie@example.com"));
//	        studentList.add(new Student(4, "Diana", 23, "Female", "diana@example.com"));
//	        studentList.add(new Student(5, "Eve", 20, "Female", "eve@example.com"));
//	        studentList.add(new Student(6, "Frank", 24, "Male", "frank@example.com"));
//	        studentList.add(new Student(7, "Grace", 22, "Female", "grace@example.com"));
//	        studentList.add(new Student(8, "Hank", 21, "Male", "hank@example.com"));
//	        studentList.add(new Student(9, "Ivy", 23, "Female", "ivy@example.com"));
//	        studentList.add(new Student(10, "Jack", 25, "Male", "jack@example.com"));
//	    }

	@GetMapping("/GetAllStudent")
	public List<Student> getAllStudents() {

		return studentList;
	}

	@GetMapping("/GetStudent/{id}")
	public Student getStudent(@PathVariable int id) {
		if(studentList.isEmpty()) {
			return null;
		}
		for (Student student : studentList) {
			if (student.getId() == id) {
				return student;}

		}
		return null;

	}

	@PostMapping("/addStudent")
	public String addStudent(@RequestBody Student student) {

		studentList.add(student);
		return "Student added successfully!";
	}

	@PutMapping("/updateStudent/{id}")
	public String updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
		for (Student student : studentList) {
			if (student.getId() == id) {
				student.setName(updatedStudent.getName());
				student.setAge(updatedStudent.getAge());
				student.setGender(updatedStudent.getGender());
				student.setEmail(updatedStudent.getEmail());
				return "Student updated successfully!";
			}
		}
		return "Student not found!";
	}

	@DeleteMapping("/deleteStudent/{id}")
	public String deleteStudent(@PathVariable int id) {
		return studentList.removeIf(student -> student.getId() == id) ? "Student deleted successfully!"
				: "Student not found!";
	}

}