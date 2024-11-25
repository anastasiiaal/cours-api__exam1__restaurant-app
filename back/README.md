start server
```
npm run dev
```

restaurant
	id
	name
    address
    zip_code
    city
    image
    owner_id => user role "owner"

dish
    id
    restaurant_id
    image
    name
    price
    description

order
    id
    restaurant_id
    dish_id[]
    date

/register
{
    "name": "John Doe",
    "password": "12345",
    "email": "johndoe@mail.com"
}

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTczMjUzODMxNiwiZXhwIjoxNzM1MTMwMzE2fQ.rKJVz4Dd_CYsH-iBb5ZYN9TzZ72shC-PpdXg_pOGxyM"
}
_____________________
/login
{
    "password": "12345",
    "email": "johndoe@mail.com"
}

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTczMjUzODYyNiwiZXhwIjoxNzM1MTMwNjI2fQ.J11VYuyr3UKH2no99scgECEFsv17gmYfios8t9oaa_o"
}