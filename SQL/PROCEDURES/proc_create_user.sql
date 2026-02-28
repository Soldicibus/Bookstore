CREATE OR REPLACE PROCEDURE proc_create_user(
    IN  p_username VARCHAR(30),
    IN  p_email VARCHAR(50),
    IN  p_password_hash TEXT,
    IN  p_role_id INT,
    OUT new_user_id INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    INSERT INTO Users (username, email, password_hash, role_id)
    VALUES (p_username, p_email, p_password_hash, p_role_id)
    RETURNING id INTO new_user_id;
END;
$$;