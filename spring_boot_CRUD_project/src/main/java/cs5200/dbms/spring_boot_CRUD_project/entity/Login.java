package cs5200.dbms.spring_boot_CRUD_project.entity;

public class Login {
  private String userNameOrEmail;
  private String password;
  private boolean isBuyer;

  public String getUserNameOrEmail() {
    return this.userNameOrEmail;
  }

  public String getPassword() {
    return this.password;
  }

  public void setBuyer(boolean buyer) {
    isBuyer = buyer;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public boolean getIsBuyer() {
    return isBuyer;
  }

  public void setUserNameOrEmail(String userNameOrEmail) {
    this.userNameOrEmail = userNameOrEmail;
  }
  public void setIsBuyer(boolean isBuyer){
    this.isBuyer = isBuyer;
  }
}
