package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity(name = "purchase")
public class Purchase {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

//  @OneToOne()
//  @JoinColumn(name = "order_id")
  @Column(name="order_id")
  private Integer orderId;

//  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//  @JoinColumn(name = "purchase_id", referencedColumnName = "id")
  //@OnDelete(action = OnDeleteAction.)
  //@JsonIgnore
  //private List<PurchaseItem> items = new ArrayList<>();

  //private int quantity;

  public Purchase() {
  }

//  public Purchase(List<PurchaseItem> items){
//   // this.orderId = orderId;
//    this.items = items;
//  }
  public Integer getId() {
    return id;
  }


//  public void setProduct(List<PurchaseItem> product) {
//    this.items = product;
//  }

//  public List<PurchaseItem> getItems() {
//    return items;
//  }

  public void setOrderId(Integer orderId) {
    this.orderId = orderId;
  }

  public Integer getOrderId() {
    return orderId;
  }
}
