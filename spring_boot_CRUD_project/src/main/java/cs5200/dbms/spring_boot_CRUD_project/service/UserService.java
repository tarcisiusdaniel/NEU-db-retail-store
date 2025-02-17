package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.UserDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@CrossOrigin(origins = "*")
public class UserService {

  @Autowired
  private UserDao userDao;

  public User createUser(User user) {
    return userDao.save(user);
  }

  public List<User> findAllUser() {
    return userDao.findAllUsers();
  }

  public User findUserById(@PathVariable("userId") Integer id) {
    return userDao.findUserById(id);
  }

  public User findUserByUserNameOrEmail(String userName, String email){
    return userDao.findUserByUserNameOrEmail(userName, email);
  }

  public User findUserByEmail(String email){
    return userDao.findUserByEmail(email);
  }
  public User findUserByPassword(String userName, String password){
    return userDao.findUserByUserNameAndPassword(userName, password);
  }

}
