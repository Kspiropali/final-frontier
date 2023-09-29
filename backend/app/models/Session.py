import uuid

from sqlalchemy import text

from ..database.db import db


class Session:
    def __init__(self, id, username, token, created_at):
        self.id = id
        self.username = username
        self.token = token
        self.created_at = created_at

    def __repr__(self):
        # as json
        return {"id": self.id, "user_id": self.user_id, "token": self.token, "expiry": self.expiry}

    def __str__(self):
        return f"<Session {self.id, self.user_id, self.token, self.expiry}>"

    @staticmethod
    def create(username):
        token = str(uuid.uuid4())

        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO session (username, token) VALUES (:username, :token)")
                    .params(username=username, token=token)
                )

                con.commit()

                if result.rowcount == 1:
                    return token
                else:
                    return "error: Session not created"
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def delete(token):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("DELETE FROM session WHERE token = :token")
                    .params(token=token)
                )

                con.commit()

                if result.rowcount == 1:
                    return "success"
                else:
                    return "error: Session not deleted"
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def check_token_exists(token):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM session WHERE token = :token")
                    .params(token=token)
                )

                if result.rowcount == 1:
                    return True
                else:
                    return False
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def get_username(token):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT username FROM session WHERE token = :token")
                    .params(token=token)
                )
                if result.rowcount == 1:
                    return result.fetchone()[0]
                else:
                    return "error: Session not found"
        except Exception as e:
            return f"error: {str(e)}"
