package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Student;
import cs5200.dbms.spring_boot_CRUD_project.service.StudentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class StudentController {

  @Autowired
  private StudentService studentService;

  @PostMapping("/add")
  public String addStudent(@RequestBody Student student) {
    return studentService.addStudent(student);
  }

  @PostMapping("/bulkAdd")
  public String addStudents(@RequestBody List<Student> students) {
    return studentService.addStudents(students);
  }

  @DeleteMapping("/all/{roll}")
  public String deleteStudent(@PathVariable int roll) {
    return studentService.deleteStudent(roll);
  }

  @PutMapping("/add")
  public String updateStudent(@RequestBody Student student) {
    return studentService.updateStudent(student);
  }

  @RequestMapping("/all/{roll}")
  public Student getStudent(@PathVariable int roll) {
    return studentService.getStudent(roll);
  }

}
