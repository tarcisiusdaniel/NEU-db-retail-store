package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.TransactionDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Transaction;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin(origins = "*")
public class TransactionService {

  @Autowired
  TransactionDao transactionDao;

  public Transaction createTransaction(Transaction transaction) {
    return transactionDao.save(transaction);
  }

  public List<Transaction> findAllTransactions() {
    return transactionDao.findAllTransactions();
  }

  public Transaction findTransactionById(Integer id) {
    return transactionDao.findTransactionById(id);
  }

  public void deleteTransaction(Integer id) {
    transactionDao.deleteById(id);
  }

  public Transaction updateTransaction(Transaction transaction) {
    return transactionDao.save(transaction);
  }

}
