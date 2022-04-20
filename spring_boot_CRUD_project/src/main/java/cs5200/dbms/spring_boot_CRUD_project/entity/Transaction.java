package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.ORDINAL)
  private Order_Status status;

  //@OneToOne(cascade = CascadeType.ALL)
  //@JoinColumn(name = "order_id")
  //private Order order;

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

//  public Order getOrder() {
//    return this.order;
//  }

  public Order_Status getStatus() {
    return this.status;
  }

  //public void setOrder(Order order) {
//    this.order = order;
//  }
}
