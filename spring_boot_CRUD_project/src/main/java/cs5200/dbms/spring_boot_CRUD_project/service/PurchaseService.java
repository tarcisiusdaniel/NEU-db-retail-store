package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.PurchaseDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import cs5200.dbms.spring_boot_CRUD_project.entity.Purchase;
import cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@CrossOrigin(origins = "*")
public class PurchaseService {

  @Autowired
  private PurchaseDao purchaseDao;


  public Purchase create(Purchase purchase) {
    return purchaseDao.save(purchase);
  }

  public List<Purchase> findAllPurchase() {
    return purchaseDao.findAllPurchases();
  }

  public Purchase findPurchaseById(@PathVariable("purchaseId") Integer id) {
    return purchaseDao.findPurchaseById(id);
  }

  public void deletePurchase(Integer id) {
    purchaseDao.deleteById(id);
  }

  public Purchase updatePurchase(Purchase purchase) {

    return purchaseDao.save(purchase);
  }

  public List<Integer> findPurchaseByOrderId(Integer orderId){
    return purchaseDao.findPurchaseByOrderId(orderId);
  }

  public List<PurchaseItem> findProductsByPurchaseId(Integer purchaseId){
    return purchaseDao.findProductsByPurchaseId(purchaseId);
  }
}
