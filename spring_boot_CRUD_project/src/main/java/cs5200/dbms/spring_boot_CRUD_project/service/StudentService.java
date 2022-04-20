package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.StudentDAO;
import cs5200.dbms.spring_boot_CRUD_project.entity.Student;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin(origins = "*")
public class StudentService {

  @Autowired
  private StudentDAO dao;

  public String addStudent(Student student) {
    dao.save(student);
    return "New Student has been added into Database, roll number :" + student.getRoll();
  }

  public String addStudents(List<Student> students) {
    dao.saveAll(students);
    return "All new Student has been added into Database";
  }

  public String deleteStudent(int roll) {
    Student student = dao.getById(roll);
    dao.delete(student);
    return "Roll Number is deleted :" + roll;
  }

  public String updateStudent(Student student) {
    dao.save(student);
    return "Roll Number is update :" + student.getRoll();
  }

  public Student getStudent(int roll) {
    return dao.findById(roll).get();
  }

}
