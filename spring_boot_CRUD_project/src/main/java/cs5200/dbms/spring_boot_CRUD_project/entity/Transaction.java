package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.ORDINAL)
  private Order_Status status;

  @Column(name="order_id")
  private Integer order;

  private Date createdOn;

  public Transaction(String status, Order order) {
    this.status = Order_Status.valueOf(status);
    //this.order = order;
    this.createdOn = new java.sql.Date(System.currentTimeMillis());
  }

  public Transaction() {

  }

  public Integer getId() {
    return this.id;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public Integer getOrder() {
    return order;
  }

  public Order_Status getStatus() {
    return this.status;
  }

  public void setStatus(Order_Status status) {
    this.status = status;
  }
}
