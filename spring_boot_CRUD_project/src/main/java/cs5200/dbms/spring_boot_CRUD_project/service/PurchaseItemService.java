package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.PurchaseItemDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin(origins = "*")
public class PurchaseItemService {

  @Autowired
  private PurchaseItemDao purchaseItemDao;

  public PurchaseItem create(PurchaseItem item) {
    return purchaseItemDao.save(item);
  }

//  public List<PurchaseItem> findAllItems() {
//    return purchaseItemDao.findAllBuyers();
//  }

//  public Buyer findBuyerById(@PathVariable("buyerId") Integer id) {
//    return purchaseItemDao.findBuyerById(id);
//  }

  public void deleteItems(Integer id) {
    purchaseItemDao.deleteById(id);
  }

  public PurchaseItem updateItems(PurchaseItem item) {

    return purchaseItemDao.save(item);
  }
}
