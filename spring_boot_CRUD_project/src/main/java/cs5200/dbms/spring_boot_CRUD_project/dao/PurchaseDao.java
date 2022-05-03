package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Purchase;
import cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PurchaseDao extends CrudRepository<Purchase, Integer> {

  @Query(value = "SELECT * FROM purchase_items",
      nativeQuery = true)
  List<Purchase> findAllPurchases();

  @Query(value = "SELECT * FROM purchase_items WHERE id=:purchaseId",
      nativeQuery = true)
  Purchase findPurchaseById(@Param("purchaseId") Integer id);

  @Query(value = "SELECT * FROM purchase_items WHERE order_id=:orderId",
      nativeQuery = true)
  List<Purchase> findPurchaseByOrderId(@Param("orderId") Integer orderId);

//  @Query(value = "select * from purchase_items where id=:purchaseId",
//      nativeQuery = true)
//  public List<Object[]> findProductsByPurchaseId(@Param("purchaseId") Integer purchaseId);
}
