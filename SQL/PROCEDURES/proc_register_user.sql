CREATE OR REPLACE PROCEDURE proc_register_user(
    IN  p_username VARCHAR(50),
    IN  p_email    VARCHAR(60),
    IN  p_password TEXT,
	IN  p_role_id integer,
    OUT new_user_id INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    /* ---------- Normalize ---------- */
    p_username := NULLIF(trim(p_username), '');
    p_email    := NULLIF(trim(p_email), '');
    p_password := NULLIF(trim(p_password), '');

    IF p_username IS NULL THEN
        RAISE EXCEPTION 'Username cannot be empty'
        USING ERRCODE = '23514';
    END IF;

    IF p_email IS NULL THEN
        RAISE EXCEPTION 'Email cannot be empty'
        USING ERRCODE = '23514';
    END IF;

    IF p_password IS NULL THEN
        RAISE EXCEPTION 'Password cannot be empty'
        USING ERRCODE = '23514';
    END IF;

    IF EXISTS (SELECT 1 FROM users WHERE username = p_username) THEN
        RAISE EXCEPTION 'Username % already exists', p_username
        USING ERRCODE = '23505';
    END IF;

    IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
        RAISE EXCEPTION 'Email % already exists', p_email
        USING ERRCODE = '23505';
    END IF;

    /* ---------- Hash password ---------- */
    p_password := crypt(p_password, gen_salt('bf'));

    /* ---------- PASS OUT PARAM DIRECTLY ---------- */
    CALL proc_create_user(
        p_username,
        p_email,
        p_password,
        new_user_id
    );
	CALL proc_assign_role_to_user(new_user_id,p_role_id);
END;
$$;
