### company를 통해 users를 가져오는 샘플.
query 
```
query tomorrowNapple {
  tomorrow: company(id: "1") {
    ...companyDetails
    users {
      ...userDetails
    }
  }
  apple: company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
}

fragment userDetails on User {
  id
  firstName
  age
}


```

resule
```
{
  "data": {
    "tomorrow": {
      "id": "1",
      "name": "tomorrow",
      "description": "111st",
      "users": [
        {
          "id": "23",
          "firstName": "ko",
          "age": 20
        },
        {
          "id": "40",
          "firstName": "lee",
          "age": 40
        }
      ]
    },
    "apple": {
      "id": "2",
      "name": "Apple",
      "description": "iPhone"
    }
  }
}
```