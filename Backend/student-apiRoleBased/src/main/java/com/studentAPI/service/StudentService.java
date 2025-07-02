package com.studentAPI.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentAPI.model.Courses;
import com.studentAPI.model.Student;
import com.studentAPI.repository.CourseRepo;
import com.studentAPI.repository.StudentRepo;

@Service
public class StudentService {

	  @Autowired
	    private StudentRepo studentRepo;

	    @Autowired
	    private CourseRepo courseRepo;

	    public String saveStudent(Student student) {
	        try {
	        	studentRepo.save(student);
	            return "Student saved successfully";
	        } catch (Exception e) {
	            System.err.println("Error while saving student: " + e.getMessage());
	            return "Failed to save student";
	        }
	    }

	    public List<Student> getAllStudent() {
	        try {
	            return (List<Student>) studentRepo.findAll();
	        } catch (Exception e) {
	            System.err.println("Error fetching all students: " + e.getMessage());
	            return new ArrayList<>();
	        }
	    }

	    public String deleteStudent(Long id) {
	        try {
	            studentRepo.deleteById(id);
	            return "Student deleted successfully";
	        } catch (Exception e) {
	            System.err.println("Error deleting student with ID " + id + ": " + e.getMessage());
	            return "Failed to delete student";
	        }
	    }

	    public String updateStudent(Long id, Student student) {
	        try {
	            Optional<Student> optionalStudent = studentRepo.findById(id);

	            if (optionalStudent.isPresent()) {
	                Student existingStudent = optionalStudent.get();

	                // Update basic fields
	                existingStudent.setName(student.getName());
	                existingStudent.setGender(student.getGender());
	                existingStudent.setEmail(student.getEmail());
	                existingStudent.setMobileNo(student.getMobileNo());

	                // Clear old courses
	                existingStudent.getCourses().clear();

	                // Add updated courses
	                List<Courses> updatedCourses = new ArrayList<>();
	                for (Courses course : student.getCourses()) {
	                    if (course.getId() != null) {
	                        Optional<Courses> existingCourse = courseRepo.findById(course.getId());
	                        existingCourse.ifPresent(updatedCourses::add);
	                    } else {
	                        updatedCourses.add(course);
	                    }
	                }

	                existingStudent.getCourses().addAll(updatedCourses);

	                studentRepo.save(existingStudent);
	                return "Student updated successfully";
	            } else {
	                return "Student not found";
	            }
	        } catch (Exception e) {
	            System.err.println("Error updating student with ID " + id + ": " + e.getMessage());
	            return "Failed to update student";
	        }
	    }
	    public Optional<Student> getStudentById(Long id) {
	        try {
	            
	            return studentRepo.findById(id);
	        } catch (Exception e) {
	            System.err.println("Error fetching student by ID " + id + ": " + e.getMessage());
	            return Optional.empty();
	        }
	    }
}
