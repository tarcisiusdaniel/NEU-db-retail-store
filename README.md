# project-SP22-gayatribirthare-tarcisiusdaniel
project-SP22-gayatribirthare-tarcisiusdaniel

Name of the project
e-commerce-5200

Name of the team and names of the team members.
e-commerce-5200
Tarcisius Daniel Hartanto and Gayatri Birthare

Brief description of the project
This project has a theme of e-commerce, where there are two users, buyers and sellers. Buyers will be able to browse products, add them to the cart, make an order from using the cart, and if the order is successfull, transactions will be generated, listinng the details from the successfull order.

Description of the two user data models
Buyer: Buyers will be able to browse products, add them to the cart, make an order from using the cart, and if the order is successfull, transactions will be generated, listinng the details from the successfull order
Seller: Seller will be adding products to the e-commerce. These items will be available for the buyers to be purchased.

Description of the three domain object data models
Products: the goods that are being sold (by the seller) and bought (by the buyer)
Purchases: the goods that has been inputted to the buyers' orders
Orders: the object that is created after the buyers checkout, which contains the list of item that wanted to be purchased
Transactions: the object that is created after orders are approved and successful

Description of the user to domain object relationship
Sellers and Products: Sellers uploading their products to the e-commerce website so that buyers are able to view and buy them (Sellers can upload many products and a product can only be uploaded by one seller - 1 to N) 
Buyers and Orders: After buyers add products to the cart and want to purchase them, order will be created based on the items in the cart (A Buyer can issue many orders and an order can only be issued by one buyer - 1 to N)

Description of the domain object to domain object relationship
Purchases to Products: Purchase is a list of products that has been added by buyers to their order(s) along with the quantity of the orders (1 to N, purchase to products, vice versa)
Order to Transaction: Once order is successfull, a transaction will be created, containing information from the successful order (1 to 1) 
Order to Purchase: an order will have one purchase (1 to 1)

Description of the portable enumeration(s)
Product Category: there are limitations to the category of products that will be sold from this e-commerce, which is why we choose the option to make enum for this attribute
Shipper: we only work with limited shipment agencies, which is why we decided to create an enum for shippers used for shipping means
Order Status: order status can only be pending, failed, and successfull, which is the reason why we created enum for this attribute
