package cs5200.dbms.spring_boot_CRUD_project.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Represents a Buyer
 */
@Entity
@Table(name = "buyers")
public class Buyer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id")
  private User user;

  private String billingAddress;
  private String shippingAddress;

  /**
   * Constructs an empty Buyer
   */
  public Buyer() {
  }

  /**
   * Constructs a Buyer using below details
   *
   * @param billingAddress  billing address as String
   * @param shippingAddress shipping address as String
   */
  public Buyer(String billingAddress, String shippingAddress) {
    //super(firstName,lastName,username,password,email,dateOfBirth);
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  /**
   * Returns billing address of a buyer
   *
   * @return billing address as String
   */
  public String getBillingAddress() {
    return this.billingAddress;
  }

  /**
   * Sets billing address of a buyer
   *
   * @param billingAddress as String
   */
  public void setBillingAddress(String billingAddress) {
    this.billingAddress = billingAddress;
  }

  /**
   * Returns shipping address of a buyer
   *
   * @return shipping address as String
   */
  public String getShippingAddress() {
    return this.shippingAddress;
  }

  /**
   * Sets shipping address
   *
   * @param shippingAddress as String
   */
  public void setShippingAddress(String shippingAddress) {
    this.shippingAddress = shippingAddress;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Integer getId() {
    return this.id;
  }
}
