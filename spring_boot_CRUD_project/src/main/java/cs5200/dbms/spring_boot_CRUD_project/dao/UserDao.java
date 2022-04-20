package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserDao extends CrudRepository<User,Integer> {
  @Query(value = "SELECT * FROM users",
      nativeQuery = true)
  public List<User> findAllUsers();

  @Query(value = "SELECT * FROM users WHERE id=:userId",
      nativeQuery = true)
  public User findUserById(@Param("userId") Integer id);}
