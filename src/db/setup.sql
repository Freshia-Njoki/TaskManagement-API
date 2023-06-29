CREATE TABLE Users
(
    user_id INT PRIMARY KEY,
    username VARCHAR (255),
    email VARCHAR (255),
    role VARCHAR (255),
    password VARCHAR (255),
    date_of_birth DATE
);


CREATE TABLE Tasks
(
    task_id INT IDENTITY(1,1) PRIMARY KEY,
    description VARCHAR(255),
    status VARCHAR(255)
);



CREATE TABLE Comments
(
    comment_id INT PRIMARY KEY,
    content VARCHAR(255),
    task_id INT,
    user_id INT,
    created_at DATE,
    CONSTRAINT FK_Comments_Users
        FOREIGN KEY (user_id)
        REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT FK_Comments_Tasks
        FOREIGN KEY (task_id)
        REFERENCES Tasks(task_id) ON DELETE CASCADE
);

CREATE TABLE Assignees
(
    assignee_id INT PRIMARY KEY,
    task_id INT,
    user_id INT,
    CONSTRAINT FK_Assignees_user_id
	 FOREIGN KEY (user_id)
	 REFERENCES Users(user_id)  ON DELETE CASCADE,
    CONSTRAINT FK_Tasks_task_id
	 FOREIGN KEY (task_id)
	 REFERENCES Tasks(task_id)  ON DELETE CASCADE
);

CREATE TABLE Projects
(
    project_id INT PRIMARY KEY,
    name VARCHAR (255),
    description VARCHAR (255),
    created_at DATE,
);


-- CREATE TABLE ProjectTasks
-- (
--     project_id INT,
--     task_id INT,
--     relationship_id INT IDENTITY(1,1),
--     PRIMARY KEY (project_id, task_id, relationship_id),
--     FOREIGN KEY (project_id) REFERENCES Projects (project_id),
--     FOREIGN KEY (task_id) REFERENCES Tasks (task_id)
-- )

-- Inserting values into the Assignees table
INSERT INTO Assignees
    (assignee_id, task_id, user_id)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 3),
    (4, 3, 4),
    (5, 4, 5),
    (6, 5, 6),
    (7, 6, 7),
    (8, 7, 8),
    (9, 8, 9);



-- Inserting values into the Comments table
INSERT INTO Comments
    (comment_id, content, task_id, user_id, created_at)
VALUES
    (1, 'This is a comment on Task 1', 1, 1, '2023-06-13'),
    (2, 'Here is another comment on Task 1', 1, 2, '2023-06-13'),
    (3, 'This is a comment on Task 3', 3, 3, '2023-06-13'),
    (4, 'Comment on Task 4', 4, 4, '2023-06-13'),
    (5, 'Another comment on Task 5', 5, 5, '2023-06-13'),
    (6, 'This is a comment on Task 6', 6, 6, '2023-06-13'),
    (7, 'Comment on Task 7', 7, 7, '2023-06-13'),
    (8, 'Another comment on Task 8', 8, 8, '2023-06-13'),
    (9, 'This is a comment on Task 9', 9, 9, '2023-06-13'),
    (10, 'Comment on Task 10', 10, 10, '2023-06-13');




-- Check if task ID exists in Tasks table
IF EXISTS (SELECT 1
FROM Tasks
WHERE task_id = 1)
    -- Check if user ID exists in Users table
    IF EXISTS (SELECT 1
FROM Users
WHERE user_id = 1)
        -- Insert the comment
        INSERT INTO Comments
    (comment_id, content, created_at, task_id, user_id)
VALUES
    (1, 'This is a comment on Task 1', '2023-06-13', 1, 1);
    ELSE
        -- User ID does not exist
        PRINT 'User ID does not exist in Users table';
ELSE
    -- Task ID does not exist
    PRINT 'Task ID does not exist in Tasks table';

CREATE TABLE Comments
(
    comment_id INT PRIMARY KEY,
    content VARCHAR(255),
    created_at DATE,
    task_id INT,
    user_id INT,
    FOREIGN KEY (task_id) REFERENCES Tasks (task_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);


-- Inserting values into the Projects table
INSERT INTO Projects
    (project_id, name, description, created_at)
VALUES
    (1, 'Project 1', 'Description of Project 1', GETDATE()),
    (2, 'Project 2', 'Description of Project 2', GETDATE()),
    (3, 'Project 3', 'Description of Project 3', GETDATE()),
    (4, 'Project 4', 'Description of Project 4', GETDATE()),
    (5, 'Project 5', 'Description of Project 5', GETDATE()),
    (6, 'Project 6', 'Description of Project 6', GETDATE()),
    (7, 'Project 7', 'Description of Project 7', GETDATE()),
    (8, 'Project 8', 'Description of Project 8', GETDATE()),
    (9, 'Project 9', 'Description of Project 9', GETDATE()),
    (10, 'Project 10', 'Description of Project 10', GETDATE());


-- Inserting values into the ProjectTasks table
INSERT INTO ProjectTasks
    (project_id, task_id)
VALUES
    (1, 5),
    (1, 7),
    (2, 3),
    (2, 6),
    (3, 1),
    (3, 4),
    (4, 2),
    (5, 1),
    (6, 8),
    (7, 9);
 
 
