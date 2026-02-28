CREATE OR REPLACE FUNCTION get_user_role(
    IN  p_user_id INT
)
RETURNS TABLE (
    role_id INT,
    role_name VARCHAR
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.name
    FROM Users u
    JOIN Roles r ON u.role_id = r.id
    WHERE u.id = p_user_id;
END;
$$;
