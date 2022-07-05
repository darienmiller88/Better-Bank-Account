# Bank Web Application.

![](https://img.shields.io/badge/made%20by-DarienMiller-blue)
![](https://img.shields.io/badge/Golang-1.17-yellow)
![](https://img.shields.io/badge/MongoDB-Cloud-green)
![](https://api.netlify.com/api/v1/badges/bc438b2e-9f12-4bbe-987e-d36fcef20a2f/deploy-status)

## Description

Full stack application built using Golang and MongoDB in the backend, and React in the frontend. This is an app to reimagine a intro level console bank account program as a full stack web application. Features I aim to add include:

 - JWT + Google OAuth2 authentication.
 - React Redux
 - Create accounts, Delete accounts, Withdraw from and Delete from accounts, and Transfer money from one account to other accounts.
 - View transfers made from user accounts.

 ## Landing page for user sign in/sign up.
<img width="944" alt="hero" src="https://user-images.githubusercontent.com/32966645/177338632-8e2966b3-4064-4ccc-99aa-26ce44a1d833.png">

## Dashboard user is greeted with.
<img width="946" alt="dashboard" src="https://user-images.githubusercontent.com/32966645/177340467-e5099b02-6236-4ad5-b3f9-3604d68af710.png">


## Create account menu.
<img width="960" alt="create account" src="https://user-images.githubusercontent.com/32966645/177341532-8b36080b-d744-48e8-b860-392792c84ca4.png">

## User selection menu to transfer money from one account to another.
<img width="956" alt="trasnfer" src="https://user-images.githubusercontent.com/32966645/177341944-dd65a964-933c-41ed-ae62-1e3c51adccbb.png">

## List of user transfers.
<img width="945" alt="transfers" src="https://user-images.githubusercontent.com/32966645/177342054-95da87ac-855f-4d96-8cbf-8731fd4bdfd3.png">


### Built With

* [React](https://reactjs.org)
* [Chi](https://github.com/go-chi/chi)
* [Bootstrap](https://getbootstrap.com)
* [MongoDB-Atlas](https://www.mongodb.com/cloud/atlas)
* [Netlify](https://bit.ly/3q4pcJz)

### Requirements
* Clone the repository using `git clone https://github.com/darienmiller88/Better-Bank-Account`
* Migrate the necessary information to your local `.env` as described in the `.env_sample` file
* Run `go build` to create a root level `Better-Bank-Account.exe` file, and then run `.\Better-Bank-Account` to run the executable. If an executable is not needed, simply input `go run main.go` instead, or `.\fresh` to enable a server restart on change.
* `cd` into the `client` folder, and run `npm start` to the react server, which shoudl be on port 3000

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Feel free to leave suggestions as well, I'm always looking for ways to improve!

<p align="right">(<a href="#top">back to top</a>)</p>

## License
[MIT](https://choosealicense.com/licenses/mit/)