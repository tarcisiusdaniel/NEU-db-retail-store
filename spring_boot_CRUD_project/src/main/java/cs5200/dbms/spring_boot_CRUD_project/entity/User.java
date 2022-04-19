package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Represents a model.User with common details
 */
@Entity
@Table(name = "users")
public class User {
  private static int PASSWORD_LENGTH = 7;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String firstName;
  private String lastName;
  private String userName;
  private String password;
  private String email;
  private Date dateOfBirth;
  private String contactNumber;
  private Date createdOn;

  /**
   * Constructs an empty model.User
   */
  public User() {
  }

  /**
   * Constructs a model.User using below details
   *
   * @param firstName   FirstName of user
   * @param lastName    LastName of user
   * @param username    UserName of user
   * @param password    Password of user
   * @param email       Email of user
   * @param dateOfBirth date of birth of user
   */
  public User(String firstName, String lastName, String username, String password, String email,
      Date dateOfBirth, Date createdOn) {
    setFirstName(firstName);
    setLastName(lastName);
    setUserName(username);
    setPassword(password);
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.createdOn = createdOn;
  }

  /**
   * Returns id of a user
   *
   * @return id as Integer
   */
  public Integer getId() {
    return id;
  }

  /**
   * Sets id
   *
   * @param id id as Integer
   */
  public void setId(Integer id) {
    this.id = id;
  }

  /**
   * Returns firstName
   *
   * @return firstname as String
   */
  public String getFirstName() {
    return this.firstName;
  }

  /**
   * Sets first name of user
   *
   * @param firstName first name as String
   */
  public void setFirstName(String firstName) {
    if (firstName != null){// && !firstName.isBlank() && firstName.matches("[a-zA-Z]+")) {
      this.firstName = firstName;
    } else {
      throw new RuntimeException("First Name can not be null");
    }
  }

  /**
   * Returns lastname
   *
   * @return lastname as String
   */
  public String getLastName() {
    return this.lastName;
  }

  /**
   * Sets last name
   *
   * @param lastName last name as String
   */
  public void setLastName(String lastName) {
    if (lastName != null){// && !lastName.isBlank() && lastName.matches("[a-zA-Z]+")) {
      this.lastName = lastName;
    } else {
      throw new RuntimeException("Last Name can not be null");
    }
  }

  /**
   * Returns username
   *
   * @return username as String
   */
  public String getUserName() {
    return this.userName;
  }

  /**
   * Sets username
   *
   * @param userName as String
   */
  public void setUserName(String userName) {
    if (userName != null){// && !userName.isBlank()) {
      this.userName = userName;
    } else {
      throw new RuntimeException("User name can not be null");
    }
  }

  /**
   * Returns password
   *
   * @return password as String
   */
  public String getPassword() {
    return this.password;
  }

  /**
   * Sets password
   *
   * @param password as String
   */
  public void setPassword(String password) {
    if (password != null){// && !password.isBlank() && password.length() > PASSWORD_LENGTH) {
      this.password = password;
    } else {
      throw new RuntimeException("Password can not be null");
    }
  }

  /**
   * Returns as DateOfBirth
   *
   * @return dob as date
   */
  public Date getDateOfBirth() {
    return this.dateOfBirth;
  }

  /**
   * Sets date of birth
   *
   * @param dateOfBirth as Date
   */
  public void setDateOfBirth(Date dateOfBirth) {
    if (dateOfBirth != null) {
      this.dateOfBirth = dateOfBirth;
    } else {
      throw new RuntimeException("date of Birth can not be null");
    }
  }

  /**
   * Returns contact number
   *
   * @return contact number as String
   */
  public String getContactNumber() {
    return this.contactNumber;
  }

  /**
   * Sets contact number
   *
   * @param contactNumber as String
   */
  public void setContactNumber(String contactNumber) {
    if (!contactNumber.matches("[0-9]+")) {
      throw new RuntimeException("Invalid contact number provided.");
    }
    this.contactNumber = contactNumber;
  }

  /**
   * Returns email
   *
   * @return email as String
   */
  public String getEmail() {
    return this.email;
  }

  /**
   * Sets email
   *
   * @param email as String
   */
  public void setEmail(String email) {
    if (email != null){// && !email.isBlank()) {
      this.email = email;
    } else {
      throw new RuntimeException("Email can not be null");
    }
  }

  /**
   * Gets date when user was created
   * @return int
   */
  public Date getCreatedOn() {
    return this.createdOn;
  }
}
