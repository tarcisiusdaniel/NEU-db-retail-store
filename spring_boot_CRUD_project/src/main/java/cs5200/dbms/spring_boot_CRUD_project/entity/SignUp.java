package cs5200.dbms.spring_boot_CRUD_project.entity;

public class SignUp {
  private String firstName;
  private String lastName;
  private String userName;
  private String email;
  private String password;
  private boolean isBuyer;
  private String billingAddress;
  private String shippingAddress;

  public String getFirstName() {
    return this.firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public String getUserName() {
    return this.userName;
  }

  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }

  public boolean getIsBuyer() {
    return this.isBuyer;
  }

  public void setIsBuyer(boolean buyer) {
    this.isBuyer = buyer;
  }

  public String getShippingAddress() {
    return this.shippingAddress;
  }

  public String getBillingAddress() {
    return this.billingAddress;
  }
}
