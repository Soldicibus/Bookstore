CREATE OR REPLACE PROCEDURE proc_reset_user_password(
    IN p_user_id integer,
    IN p_new_password varchar(50)
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM vws_users WHERE user_id = p_user_id
    ) THEN
        RAISE EXCEPTION 'User % does not exist', p_user_id
        USING ERRCODE = '22003';
    END IF;

    p_new_password := NULLIF(trim(p_new_password), '');

    IF p_new_password IS NULL THEN
        RAISE EXCEPTION 'Password cannot be empty'
        USING ERRCODE = '23514';
    END IF;
    
    p_new_password := crypt(p_new_password, gen_salt('bf'));
    UPDATE users
    SET password = p_new_password
    WHERE user_id = p_user_id;
END;
$$;
