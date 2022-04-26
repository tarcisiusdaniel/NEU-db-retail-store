package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Purchase;
import cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PurchaseDao extends CrudRepository<Purchase, Integer> {

  @Query(value = "SELECT * FROM purchase",
      nativeQuery = true)
  public List<Purchase> findAllPurchases();

  @Query(value = "SELECT * FROM purchase WHERE id=:purchaseId",
      nativeQuery = true)
  public Purchase findPurchaseById(@Param("purchaseId") Integer id);

  @Query(value = "SELECT id FROM purchase WHERE order_id=:orderId",
      nativeQuery = true)
  public List<Integer> findPurchaseByOrderId(@Param("orderId") Integer orderId);

  @Query(value = "SELECT * FROM cart_items WHERE purchase_id=:purchaseId",
      nativeQuery = true)
  public List<PurchaseItem> findProductsByPurchaseId(@Param("purchaseId") Integer purchaseId);
}
