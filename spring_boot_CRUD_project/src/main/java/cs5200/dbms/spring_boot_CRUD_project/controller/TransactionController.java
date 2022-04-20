package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Transaction;
import cs5200.dbms.spring_boot_CRUD_project.service.TransactionService;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "*")
public class TransactionController {


  @Autowired
  private TransactionService transactionService;

  @PostMapping("/create")
  public String add(@RequestBody Transaction transaction) {
    return transactionService.createTransaction(transaction).getId() > 0
        ? "Transaction created successfully" : "Failed";
  }

  @GetMapping("/findAll")
  public List<Transaction> getAll() {
    return transactionService.findAllTransactions();
  }

  @GetMapping("/find/{transactionId}")
  public Transaction getTransaction(@PathVariable("transactionId") int id) {
    return transactionService.findTransactionById(id);
  }

  @GetMapping("/delete/{transactionId}")
  public void delete(@PathVariable("transactionId") int id) {
    transactionService.deleteTransaction(id);
  }

  @PostMapping("/update/{transactionId}")
  public String update(@PathVariable("transactionId") Integer transactionId,
      @RequestBody Transaction transaction) {
    if (transaction == null || transactionId == null || transactionId.intValue() < 1) {
      throw new RuntimeException("Arguments can not be null.");
    }

    Transaction oldTransaction = transactionService.findTransactionById(transactionId);

    if (oldTransaction == null) {
      throw new RuntimeException("Transaction does not exist as per the given details");
    }

    Transaction updateTransaction = transactionService.updateTransaction(transaction);

    if (!Objects.equals(oldTransaction.getId(), updateTransaction.getId())) {
      throw new RuntimeException(
          "Error occurred while updating transaction details. Please check later.");
    }

    return "Transaction updated successfully";
  }

}
