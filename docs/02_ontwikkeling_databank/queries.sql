-- update event title
UPDATE EVENTS
SET TITLE = ("nieuwe titel")
WHERE ID = 1;

-- update event description
UPDATE EVENTS
SET DESCRIPTION = ("nieuwe beschrijving")
WHERE ID = 1;

-- update event date
UPDATE EVENTS
SET EVENT_DATE = ("2026-01-01")
WHERE ID = 1;

-- update location
UPDATE EVENTS
SET LOCATION = ("nieuwe locatie")
WHERE ID = 1;

-- update status
UPDATE EVENTS
SET STATUS = 0
WHERE ID = 1;


-- delete event
DELETE FROM EVENTS
WHERE ID = 3;


-- select all events of 1 user
SELECT TITLE, DESCRIPTION, EVENT_DATE, LOCATION, STATUS
FROM EVENTS
WHERE USER_ID = 2;


-- login/register process
SELECT ID, PASSWORD
FROM USERS
WHERE EMAIL = "test@mail.com";

-- login
SELECT ID, USERNAME, PASSWORD FROM USERS
WHERE EMAIL = "test@mail.com"
AND PASSWORD = "hash";

-- register
INSERT INTO USERS (USERNAME, EMAIL, PASSWORD)
VALUES ("testuser", "test@mail.com", "hash");
