# SpringBootAngularJwtStarter

implementattions of https://dzone.com/articles/spring-boot-security-json-web-tokenjwt-hello-world


Spring boot config with jwt

run the spring boot app, 

for url of "/" it will serve the angular app, can login/logout using jwt

for url of "/api/authenticate", use post method with {"username":"username","password":"password"} on body, it will return a jwt token

for url of "/api/hello" it will check if authenticate, then response text of helloWord, use the token on authorization header, fill in the value with "bearer"+tokenAbove








