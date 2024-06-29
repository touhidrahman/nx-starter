# EXAMPLE-SERVER

## Terminology

**Vendor** = Service provider
**Client** = Client

## User - Group System

A user can be part of Group. A group can be of either "Vendor" or "Client".

When a user logs in, a token is generated which contains userId, groupId and roleId.

## Access Control

0 = None
1 = Read
2 = Create
3 = Edit
4 = Delete

## Permission

We need to seed the DB with entities/areas our application will work.
The permission table will map the access for each role (and groupId).
