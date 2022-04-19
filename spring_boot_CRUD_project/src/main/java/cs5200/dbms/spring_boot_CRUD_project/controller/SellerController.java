package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.service.SellerService;
import cs5200.dbms.spring_boot_CRUD_project.entity.Seller;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
public class SellerController {

  @Autowired
  private SellerService sellerService;

//  @GetMapping("/")
//  public String index() {
//    return "Greetings from Spring Boot!";
//  }

  @PostMapping("/create")
  public String add(@RequestBody Seller seller) {
    return sellerService.createSeller(seller).getId() > 0 ? "Seller created successfully" : "Failed";

  }

  @GetMapping("/findAll")
  public List<Seller> getAll(){
    return sellerService.findAllSeller();
  }

  @GetMapping("/find/{sellerId}")
  public Seller getSeller(@PathVariable("sellerId") int id){
    return sellerService.findSellerById(id);
  }

  @GetMapping("/delete/{sellerId}")
  public void delete(@PathVariable("sellerId") int id){
    sellerService.deleteSeller(id);
  }

  @PostMapping("/update")
  public String update(@RequestBody Seller seller){
    if(seller == null)
      throw new RuntimeException("Argument can not be null.");

    Seller oldSeller = sellerService.findSellerById(seller.getId());

    if(oldSeller == null)
      throw new RuntimeException("Seller does not exist as per the given details");

    Seller newSeller = sellerService.updateSeller(seller);

    if(!Objects.equals(oldSeller.getId(), newSeller.getId()))
      throw new RuntimeException("Error occurred while updating seller details. Please check later.");

    return newSeller.getId() > 0 ? "Seller updated successfully" : "Failed";
  }
}
