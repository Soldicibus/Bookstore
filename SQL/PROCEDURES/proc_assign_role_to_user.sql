CREATE OR REPLACE PROCEDURE proc_assign_role_to_user(
    IN p_user_id integer,
    IN p_role_id integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users WHERE id = p_user_id
    ) THEN
        RAISE EXCEPTION 'User % does not exist', p_user_id
        USING ERRCODE = '22003';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM roles WHERE id = p_role_id
    ) THEN
        RAISE EXCEPTION 'Role % does not exist', p_role_id
        USING ERRCODE = '22003';
    END IF;

    UPDATE users
    SET role_id = p_role_id
    WHERE id = p_user_id;
END;
$$;
