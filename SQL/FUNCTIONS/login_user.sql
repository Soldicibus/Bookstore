CREATE OR REPLACE FUNCTION login_user(
    IN  p_identifier VARCHAR(50), -- Can be username or email
    IN  p_password TEXT,
    OUT user_id    INT,
    OUT username VARCHAR(30),
    OUT email VARCHAR(50)
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_password_hash TEXT;
BEGIN
    /* ---------- Normalize ---------- */
    p_identifier := NULLIF(trim(p_identifier), '');
    p_password   := NULLIF(trim(p_password), '');

    IF p_identifier IS NULL THEN
        RAISE EXCEPTION 'Username or email cannot be empty'
        USING ERRCODE = '23514';
    END IF;

    IF p_password IS NULL THEN
        RAISE EXCEPTION 'Password cannot be empty'
        USING ERRCODE = '23514';
    END IF;

    -- Try to find user by username or email
    SELECT u.id, u.username, u.email, u.password_hash
    INTO user_id, username, email, v_password_hash
    FROM Users u
    WHERE u.username = p_identifier OR u.email = p_identifier;

    -- If user not found, raise exception
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'Invalid credentials'
        USING ERRCODE = '28P01';
    END IF;

    -- Verify password
    IF v_password_hash IS NULL OR v_password_hash != crypt(p_password, v_password_hash) THEN
        RAISE EXCEPTION 'Invalid credentials'
        USING ERRCODE = '28P01';
    END IF;
END;
$$;

