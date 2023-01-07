# RECursion Website Frontend

## ref club websites :-

- https://www.ssncc.tech/
- https://codingiitg.github.io/
- https://pc.iitmandi.co.in/
- https://luxiren-react.vercel.app/en/education/

## Login workflow

- user enters credentials and req is sent to server /token
- server sends access,refresh tokens.
- we set {access,refresh,user} (by decoding access token) in our state as well as localstorage
- if access token is invalid -> new token is asked /token/refresh
- It is done by axios intercepters.
- If the refresh token also invalid then login user , and after login store state where he's coming from and redirect.

USER[login] -> see if auth? -> save token in localstorage -> setAuth
<br/> yes -> use that token to req -> if fails , intercept and ask new token

# Pages

- Homepage should contain links to events/IE/blogs/etc
- Make Auth mandatory for IE,Blogs,AskREC [keep experimenting]
- Home Page
- Team Page
- IE Page
- Blogs Page
- AskREC Page
- Login Page
- Register Page
- Events Page
- Get Started Page [can make static - only img calls can be from server]

# Used Best Coding Practices

- eslint should be installed
- prettier for code formatting
- /api : contains all api calls logic
- /components : houses all components
  <br/> -> can think of refactoring into pages and components but not now

- /hooks : custom hooks for authentication , intercepters etc
- /context : context api global store stuff
- /utils : all other stuff constants , data , routes , roles etc

<strong>Focus should be on code quality and highly maintainable code</strong>
