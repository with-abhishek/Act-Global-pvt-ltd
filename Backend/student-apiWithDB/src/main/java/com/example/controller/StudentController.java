package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Student;
import com.example.service.StudentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/studentAPI")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@PostMapping("/addStudent")
	public String SaveStudent(@RequestBody  Student student) {
//		System.out.println(student.getName());
		studentService.saveStudent(student);
	
		return "save successfully"; 
	}
	
	
	@GetMapping("/getAll")
	public List<Student> getStudent(){
		return studentService.getAllStudent();
	}
	
	@DeleteMapping("/deleteStudent")
	public void deleteStudent(@RequestParam Long id) {
		studentService.deleteStudent(id);
		
	}
	
	@PutMapping("/updateStudent")
	public String updateStudent(@RequestParam Long id , @RequestBody Student student ) {
		System.out.println(student.getCourses().toString());
		return studentService.updateStudent(id, student);
//		return "running update API's......";
	}
	
	@GetMapping("/getStudent")
	public Optional<Student> getStudent(@RequestParam Long id) {
		return studentService.getStudentById(id);}
	
	
	
}
