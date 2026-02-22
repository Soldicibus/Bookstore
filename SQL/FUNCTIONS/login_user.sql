CREATE OR REPLACE FUNCTION login_user(
    p_login TEXT,   -- username OR email
    p_password TEXT
)
RETURNS TABLE (
    user_id INT,
    username VARCHAR,
    email VARCHAR
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.user_id,
        u.username,
        u.email
    FROM vws_user_auth_info u
    WHERE
        (u.username = p_login OR u.email = p_login)
        AND u.password = crypt(p_password, u.password);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid credentials'
        USING ERRCODE = '28P01';
    END IF;
END;
$$;

