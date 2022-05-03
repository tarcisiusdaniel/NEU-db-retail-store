package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import cs5200.dbms.spring_boot_CRUD_project.entity.OrderPurchaseItemsDto;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderDao extends CrudRepository<Order, Integer> {

  @Query(value = "SELECT * FROM orders",
      nativeQuery = true)
  List<Order> findAllOrders();

  @Query(value = "SELECT * FROM orders WHERE id=:orderId",
      nativeQuery = true)
  Order findOrderById(@Param("orderId") Integer id);

  @Query(value = "SELECT * FROM orders WHERE buyer_id=:buyerId",
      nativeQuery = true)
  List<Order> findOrderByBuyerId(@Param("buyerId") Integer buyerId);

  @Query(value = "select i.id,i.order_Id,i.quantity,p.product_name from purchase_items i join products p on p.id=i.product_id where i.order_id=:orderId",
      nativeQuery = true)
  List<?> findPurchaseItems(@Param("orderId") Integer orderId);

}
