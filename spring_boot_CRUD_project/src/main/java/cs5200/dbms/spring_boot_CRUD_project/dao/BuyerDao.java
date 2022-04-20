package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BuyerDao extends CrudRepository<Buyer, Integer> {

  @Query(value = "SELECT * FROM buyers",
      nativeQuery = true)
  public List<Buyer> findAllBuyers();

  @Query(value = "SELECT * FROM buyers WHERE id=:buyerId",
      nativeQuery = true)
  public Buyer findBuyerById(@Param("buyerId") Integer id);
}
