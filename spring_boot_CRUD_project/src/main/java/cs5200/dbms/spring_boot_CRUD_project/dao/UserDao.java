package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserDao extends CrudRepository<User, Integer> {

  @Query(value = "SELECT * FROM users",
      nativeQuery = true)
  public List<User> findAllUsers();

  @Query(value = "SELECT * FROM users WHERE id=:userId",
      nativeQuery = true)
  public User findUserById(@Param("userId") Integer id);

  @Query(value = "SELECT * FROM users WHERE user_name=:userName or email=:email",
      nativeQuery = true)
  public User findUserByUserNameOrEmail(@Param("userName") String userName,
      @Param("email") String email);

  @Query(value = "SELECT * FROM users WHERE email=:email",
      nativeQuery = true)
  public User findUserByEmail(@Param("email") String email);

  User findByUserName(String username);

  @Query(value = "SELECT * FROM users WHERE user_name=:userName or email=:userName and password=:password",
      nativeQuery = true)
  public User findUserByUserNameAndPassword(@Param("userName") String userName,
      @Param("password") String password);

}
