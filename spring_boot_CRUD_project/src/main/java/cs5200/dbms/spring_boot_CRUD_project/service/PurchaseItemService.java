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


  public PurchaseItem updateItems(PurchaseItem item) {

    return purchaseItemDao.save(item);
  }
}
