#Authentication to api web requires that api can
1.register
2.login
3.logout
4.allows to reset the password

#some on the things we need to know when implement authentication
1.password storage
2.password length
3.brute-force safeguards

**_ role of thumb never ever store a password as a plaintext _**

key derivation function = hashing function

an algorithm for hashing a password
let bcrypt = require("bcryptjs)
const credentials = req.body
let hash = bcrypt.hashSync(credentials.password , 12) // this hashes the password ,12 the rounds that were used the password the longer the rounds the better the slower your server is

reassigned the credentials.password to the credentials so we can send to the db
credentials.password = hash

find the user by their usernames and compared the hashed password in the db
with guessed one

if(user && bcrypt.compareSync(guess user.password , the password in db))

an algorithm for store the cookie in the session storage

1. client sends credentials
2. server verify the credentials
3. server create a session for the client
4. server produces and sends back cookies
5. client stores cookies
6. client send cookies on every request
7. server verify cookies
8. server provides access for the client to the sources

to understand how cookies transmitted to the client server then we have to understand the structure message of http.
Http message be it on request and response has 2 main parts header and bodies

what is slating ?
random string could be at the beginning or the end of the password
that attached to the password before it gets hashed


session is just a piece of information that been saved in the server memory or the db
and also have information about the authentication so the server remembered you logged in

cookies is just a way for http client to persist chunk of data locally so when the client sends http request , it also automatically sends all the data (cookie) as request header

how session and cookies are working ?
1. server creates a session
2. server send session id
3. session id send inside the cookie 
4. cookie sets locally 
5. client considered logged
