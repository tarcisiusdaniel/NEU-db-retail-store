package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Purchase;
import cs5200.dbms.spring_boot_CRUD_project.service.OrderService;
import cs5200.dbms.spring_boot_CRUD_project.service.PurchaseItemService;
import cs5200.dbms.spring_boot_CRUD_project.service.PurchaseService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/purchase")
@CrossOrigin(origins = "*")
public class PurchaseController {

  @Autowired
  private PurchaseService purchaseService;

//  @Autowired
//  private OrderService orderService;
//
//  @Autowired
//  private PurchaseItemService purchaseItemService;

  @GetMapping("/")
  public String index() {
    return "Greetings from Spring Boot!";
  }

  @PostMapping("/create")
  public String add(@RequestBody Purchase purchase) {
    return addPurchase(purchase);
  }
  public String addPurchase(Purchase purchase){
//    Purchase newPurchase = new Purchase(purchase.getItems());
//
//    newPurchase.setProduct(purchase.getItems());
    Purchase p = purchaseService.create(purchase);
    return p.getId() > 0 ? "Purchase created successfully" : "Failed";
  }


  @GetMapping("/findAll")
  public List<Purchase> getAll() {
    return purchaseService.findAllPurchase();
  }

  @GetMapping("/find/{purchaseId}")
  public Purchase getPurchase(@PathVariable("purchaseId") int id) {
    return purchaseService.findPurchaseById(id);
  }

  @GetMapping("/delete/{purchaseId}")
  public void delete(@PathVariable("purchaseId") int id) {
    purchaseService.deletePurchase(id);
  }

  @PostMapping("/update/{purchaseId}")
  public String update(@PathVariable("purchaseId") int id, @RequestBody Purchase purchase) {
    Purchase purchaseById = purchaseService.findPurchaseById(id);
    if (purchaseById == null) {
      throw new RuntimeException("Buyer does not exist as per the given details");
    }
    if (purchase == null) {
      throw new RuntimeException("Purchase can not be null.");
    }
//    if (purchase.getOrder() == null) {
//      throw new RuntimeException("Order Id can not be null while updating Purchase.");
//    }
    Purchase newPurchase = purchaseService.updatePurchase(purchase);

    if (purchaseById.getId() != newPurchase.getId()) {
      throw new RuntimeException(
          "Error occurred while updating buyer details. Please check later.");
    }

    return newPurchase.getId() > 0 ? "Buyer updated successfully" : "Failed";
  }
}
