package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.List;
import javax.persistence.Column;

public class ShoppingCartBunch {

  private Integer id;

    private List<Product> products;

    private Integer buyerId;

    @Column(name = "total_price")
    private Double totalPrice;

    /**
     * Constructs a Shopping Cart using below details
     */
    public ShoppingCartBunch(Double price, Integer quantity, List<Product> productId) {
      this.totalPrice = price;
      this.products = productId;
    }

    public ShoppingCartBunch() {

    }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public List<Product> getProducts() {
      return products;
    }

    /**
     * Returns a total price
     *
     * @return total price
     */
    public double getTotalPrice() {
      return this.totalPrice;
    }

    /**
     * Sets price
     *
     * @param totalPrice as double
     */
    public void setTotalPrice(double totalPrice) {
      this.totalPrice = totalPrice;
    }

    public Integer getBuyerId() {
      return this.buyerId;
    }

    public void setBuyerId(int buyerId) {
      this.buyerId = buyerId;
    }

}
