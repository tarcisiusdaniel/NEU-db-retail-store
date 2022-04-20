package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.ShoppingCart;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ShoppingCartDao extends CrudRepository<ShoppingCart,Integer> {
  @Query(value = "SELECT * FROM carts",
      nativeQuery = true)
  public List<ShoppingCart> findAllCarts();

  @Query(value = "SELECT * FROM carts WHERE id=:cartId",
      nativeQuery = true)
  public ShoppingCart findCartById(@Param("cartId") Integer id);

}
