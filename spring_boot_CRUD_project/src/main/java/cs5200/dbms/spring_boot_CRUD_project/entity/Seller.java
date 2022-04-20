package cs5200.dbms.spring_boot_CRUD_project.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Represents a Seller
 */
@Entity
@Table(name = "sellers")
public class Seller {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id")
  private User user;

  private String address;

  /**
   * Constructs a Seller using below detail
   *
   * @param address address as String
   */
  public Seller(String address) {
    this.address = address;
  }

  /**
   * Constructs an empty Seller
   */
  public Seller() {
  }

  /**
   * Returns address
   *
   * @return address as String
   */
  public String getAddress() {
    return this.address;
  }

  /**
   * Sets address
   *
   * @param address address in String
   */
  public void setAddress(String address) {
    this.address = address;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public User getUser() {
    return this.user;
  }

  public Integer getId() {
    return this.id;
  }
}

