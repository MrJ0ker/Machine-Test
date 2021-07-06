# Machine-Test
clone from the master branch to local
install dependecies using npm i
provide stripe key in the 'payment.ts' of the project
run the frontend using ng serve
When the project loads it will be directed to a homepage where invoices of customers can be added.
Name, invoice id ,invoice amount,customer email should be provided which is saved to the invoice_maaster table via django backend
When there is more than 1 invoice in the invoice_master table  it will be shown in the homepage .
Below which there will be a send mail button which upon pressing will send unique shortened payment links to the unpaid customers
Through the payment link the customers will be redirected to the stripe payment getaway where they have to provide their card details.
After successfull completion the invoice gets updated to paid.![Screenshot from 2021-07-06 08-46-54](https://user-images.githubusercontent.com/57361245/124537136-f41be080-de36-11eb-94d3-517b71edceed.png)
![Screenshot from 2021-07-06 08-46-31](https://user-images.githubusercontent.com/57361245/124537167-0269fc80-de37-11eb-914c-1fb1292b2afa.png)

