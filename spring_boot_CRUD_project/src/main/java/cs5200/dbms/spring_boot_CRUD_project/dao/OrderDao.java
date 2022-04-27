package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderDao extends CrudRepository<Order, Integer> {

  @Query(value = "SELECT * FROM orders",
      nativeQuery = true)
  public List<Order> findAllOrders();

  @Query(value = "SELECT * FROM orders WHERE id=:orderId",
      nativeQuery = true)
  public Order findOrderById(@Param("orderId") Integer id);

  @Query(value = "SELECT * FROM orders WHERE buyer_id=:buyerId",
      nativeQuery = true)
  public List<Order> findOrderByBuyerId(@Param("buyerId") Integer buyerId);

}
