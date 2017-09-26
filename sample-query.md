#GraphiQL을 Request/Response 정보.


### User정보와 유저의 회사정보를 가져오는 샘플.

####Request 
```
{
  user(id: "23") {
    id
    firstName
    company {
      name
    }
  }
}

```

#### Response
```json
{
  "data": {
    "user": {
      "id": "23",
      "firstName": "ko",
      "company": {
        "name": "tomorrow"
      }
    }
  }
}
```


### Company정보와 users를 가져오는 샘플.

####Request 
```
{
  company(id: "1") {
    id
    name
    description
    users {
      id
      firstName
      age
    }
  }
}

```

#### Response
```json
{
  "data": {
    "company": {
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
        },
        {
          "id": "44",
          "firstName": "ra",
          "age": 45
        }
      ]
    }
  }
}
```


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


###mutation을 이용한 유저 삭제.

#### Request
```
mutation {
	deleteUser(id : "SJ0Wox-i-") {
    id
  }
}

```
#### Response
```json
{
  "data": {
    "deleteUser": {
      "id": null
    }
  }
}
```

###mutation을 이용한 유저 수정(Patch).

#### Request
```
mutation {
  editUser(id: "44", firstName: "ra", age: 45) {
    id
    firstName
    age
    company {
      id
      name,
      description
    }
  }
}



```
#### Response
```json
{
  "data": {
    "editUser": {
      "id": "44",
      "firstName": "ra",
      "age": 45,
      "company": {
        "id": "1",
        "name": "tomorrow",
        "description": "111st"
      }
    }
  }
}
```
