package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Seller;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SellerDao extends CrudRepository<Seller, Integer> {
  @Query(value = "SELECT * FROM sellers",
      nativeQuery = true)
  public List<Seller> findAllSellers();

  @Query(value = "SELECT * FROM sellers WHERE id=:sellerId",
      nativeQuery = true)
  public Seller findSellerById(@Param("sellerId") Integer id);
}
