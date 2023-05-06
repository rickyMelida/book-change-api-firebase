
# Change Book API Firebase

API created to used at the Change Book Application, a site web to change and buy book with the owner of the book.



## Documentation

[Documentation](https://book-change-api-firebase.onrender.com/api/v1/docs/#/)


## API Reference

#### User authentication verification

```http
  GET /api/auth/${uid}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `uid` | `string` | User uid provided by Firebase Auth |

#### User Register

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` |  **Example:** jhon.smith@gmail.com  |
| `password`      | `string` | **Example:** a.123456 |
| `User Name`      | `string` | **Example:** Juan Perez  |
| `Profile Photo`      | `string` | **Example:**. https://userrandom.com/my-photo.jpg |
| `Phone Number`      | `string` | **Example:** +595991123456 |

#### Login of a user

```http
  POST /api/auth/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | Email with which the user registered |
| `password` | `string` | Password with which the user registered |

#### Logout of a user

```http
  POST /api/auth/signout
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None` | `-` | No Parameters |

