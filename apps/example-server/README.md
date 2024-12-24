# EXAMPLE-SERVER

We are following this tutorial to build Hono Server: https://youtu.be/sNh9PoM9sUE?si=pwtKNQJQE9GDOHpO

Access API Docs: Run `npm run dev:server` then go to http:localhost:3000/docs in your browser.

## Terminology

**Vendor** = Service provider

**Client** = Client, public user

## System Overview

- `AuthUser` is for authentication only. No business code should directly reference auth user.
- `User` is to be used for relationship to models. An `AuthUser` can have many `User`.

# TODO: (20/10/2024) Reveiew following sections

## User - Group System

- A user can be part of Group.
- A group can be of either "Vendor" or "Client" type.
- Group and User are connected Many-to-Many.
- A user can be in a group only once, at a certain role.

## Auth

When a user logs in, a token is generated which contains userId, groupId, roleId and group type.

## Access Control

0 = None
1 = Read
2 = Create
3 = Edit
4 = Delete

## Permission

We need to seed the DB with entities/areas our application will work.
The permission table will map the access for each role (and groupId).
For example:

| ID  | Application Area |
| --- | ---------------- |
| 1   | User             |
| 2   | Documents        |
| 3   | Contacts         |

| ID  | Group ID | Role ID | Area      | Access |
| --- | -------- | ------- | --------- | ------ |
| 1   | 1        | 1       | Contacts  | 4      |
| 2   | 1        | 1       | Documents | 1      |
