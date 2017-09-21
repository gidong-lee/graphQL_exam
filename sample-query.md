### Company정보와 users를 가져오는 샘플.
rename, fragment 사용

####Request 
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

#### Response
```json
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



###mutation을 이용한 유저 추가 및 생성 정보 받기.

#### Request
```
mutation {
  addUser(firstName: "gu", age: 40) {
    id
    firstName
    age
  }
}
```

#### Response
```json
{
  "data": {
    "addUser": {
      "id": "SJ0Wox-i-",
      "firstName": "gu",
      "age": 40
    }
  }
}
```