# App

GymPass style app.

## FR (Functional Requirements)

- [x] Should be able to register;
- [x] Should be able to authenticate;
- [x] should be able to get the profile of connected user;
- [x] should be able to get check-ins number from connected user;
- [x] should be able to get user's check-ins history;
- [x] should be able to find nearby gyms (until 10km);
- [x] should be able to find gyms by name;
- [x] should be able to do check-in at gym;
- [x] should be able to validate user check-in;
- [x] should be able to register a gym;

## BR (Business rules)

- [x] The user should not be able to register with a duplicate e-mail;
- [x] The user cannot check in twice on the same day;
- [x] The user can only check in if they are within 100m of a gym;
- [x] A check-in can only be validated within 20 minutes of its creation;
- [x] A check-in can only be validated by an administrator;
- [x] A Gym can only be registered by an administrator;

## NFR (Non-functional requirements)

- [x] The user's password must be encrypted;
- [x] Application data must be persisted in a postgresSQL database;
- [x] All data lists must be paginated with twenty (20) items per page;
- [x] The user must be identified by JWT (JSON Web Token);