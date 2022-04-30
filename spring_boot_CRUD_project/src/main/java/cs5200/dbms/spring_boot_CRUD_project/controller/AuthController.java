package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.entity.Login;
import cs5200.dbms.spring_boot_CRUD_project.entity.Seller;
import cs5200.dbms.spring_boot_CRUD_project.entity.SignUp;
import cs5200.dbms.spring_boot_CRUD_project.entity.User;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import cs5200.dbms.spring_boot_CRUD_project.service.SellerService;
import cs5200.dbms.spring_boot_CRUD_project.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UserService userService;
  @Autowired
  private BuyerService buyerService;
  @Autowired
  private SellerService sellerService;

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@RequestBody SignUp signUp){

    // add check for username exists in a DB
    User userInDb = userService.findUserByUserNameOrEmail(signUp.getUserName(), signUp.getEmail());
    if(userInDb!=null && userInDb.getUserName().equals(signUp.getUserName())){
      return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
    }

    // add check for email exists in DB
    if(userInDb!= null && userInDb.getEmail().equals(signUp.getEmail())){
      return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
    }
    User user = new User();
    user.setFirstName(signUp.getFirstName());
    user.setLastName(signUp.getLastName());
    user.setUserName(signUp.getUserName());
    user.setEmail(signUp.getEmail());
    user.setPassword(signUp.getPassword());

    if(signUp.getIsBuyer()){

      Buyer buyer = new Buyer();
      buyer.setUser(user);
      buyer.setBillingAddress(signUp.getBillingAddress());
      buyer.setShippingAddress(signUp.getShippingAddress());
      int id = buyerService.createBuyer(buyer).getId();
      return id > 0 ? new ResponseEntity<>("Buyer registered successfully", HttpStatus.OK) :
          new ResponseEntity<>("Buyer registration failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }else{
      Seller seller = new Seller();
      seller.setUser(user);
      seller.setAddress(signUp.getBillingAddress());
      int id = sellerService.createSeller(seller).getId();
      return id > 0 ? new ResponseEntity<>("Seller registered successfully", HttpStatus.OK) :
          new ResponseEntity<>("Seller registration failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody Login loginDetails){
    User userInDb = userService.findUserByUserNameOrEmail(loginDetails.getUserNameOrEmail(),
        loginDetails.getUserNameOrEmail());
    if(userInDb!=null && !userInDb.getUserName().trim().equals(loginDetails.getUserNameOrEmail())
       &&  !userInDb.getEmail().trim().equals(loginDetails.getUserNameOrEmail())){
      return new ResponseEntity<>("Username or Email do not exist.", HttpStatus.BAD_REQUEST);
    }



      var userFound = userService.findUserByPassword(loginDetails.getUserNameOrEmail(), loginDetails.getPassword());
      if(userFound == null){
        return new ResponseEntity<>("Wrong credentials passed. Login failed.", HttpStatus.BAD_REQUEST);
      }
    if(loginDetails.getIsBuyer()){
      return new ResponseEntity<>(buyerService.findBuyerByUserId(userFound.getId()), HttpStatus.OK);
    }else{
      return new ResponseEntity<>(sellerService.findSellerByUserId(userFound.getId()), HttpStatus.OK);
    }
  }
  @GetMapping("/users")
  public List<User> listUsers(User user) {
    List<User> listUsers = userService.findAllUser();
    return listUsers;
  }
}

