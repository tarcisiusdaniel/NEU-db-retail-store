package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Seller;
import cs5200.dbms.spring_boot_CRUD_project.service.SellerService;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
@CrossOrigin(origins = "*")
public class SellerController {

  @Autowired
  private SellerService sellerService;

  @PostMapping("/create")
  public ResponseEntity<?> add(@RequestBody Seller seller) {
    int id = sellerService.createSeller(seller).getId();
    return id > 0 ? new ResponseEntity<>("Seller created successfully", HttpStatus.OK) :
        new ResponseEntity<>("Failed",HttpStatus.BAD_REQUEST);

  }

  @GetMapping("/findAll")
  public List<Seller> getAll() {

    return sellerService.findAllSeller();
  }

  @GetMapping("/find/{sellerId}")
  public Seller getSeller(@PathVariable("sellerId") int id) {
    return sellerService.findSellerById(id);
  }

  @GetMapping("/delete/{sellerId}")
  public void delete(@PathVariable("sellerId") int id) {
    sellerService.deleteSeller(id);
  }

  @PostMapping("/update/{sellerId}")
  public String update(@PathVariable("sellerId") int id, @RequestBody Seller seller) {
    if (seller == null) {
      throw new RuntimeException("Seller can not be null.");
    }
    if (seller.getUser().getId() == null) {
      throw new RuntimeException("User Id can not be null while updating seller.");
    }
    Seller oldSeller = sellerService.findSellerById(seller.getId());

    if (oldSeller == null) {
      throw new RuntimeException("Seller does not exist as per the given details");
    }

    Seller newSeller = sellerService.updateSeller(seller);

    if (!Objects.equals(oldSeller.getId(), newSeller.getId())) {
      throw new RuntimeException(
          "Error occurred while updating seller details. Please check later.");
    }

    return newSeller.getId() > 0 ? "Seller updated successfully" : "Failed";
  }
}
