package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TransactionDao extends CrudRepository<Transaction, Integer> {

  @Query(value = "SELECT * FROM transactions",
      nativeQuery = true)
  public List<Transaction> findAllTransactions();

  @Query(value = "SELECT * FROM transactions WHERE id=:transactionId",
      nativeQuery = true)
  public Transaction findTransactionById(@Param("transactionId") Integer id);
}
