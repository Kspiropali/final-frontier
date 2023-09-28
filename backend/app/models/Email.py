import uuid

from sqlalchemy import text

from ..database.db import db

class Email:
    def __init__(self, id, username, token, is_reset, created_at, expires_at):
        self.id = id
        self.username = username
        self.token = token
        self.is_reset = is_reset
        self.created_at = created_at
        self.expires_at = expires_at

    def __repr__(self):
        return {"id": self.id, "username": self.username, "token": self.token, "is_reset": self.is_reset, "created_at": self.created_at, "expires_at": self.expires_at}

    def __str__(self):
        return f"<Email {self.id, self.username, self.token, self.is_reset, self.created_at, self.expires_at}>"

    @staticmethod
    def create(username, is_reset):
        token = str(uuid.uuid4())

        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO email (username, token, is_reset) VALUES (:username, :token, :is_reset)")
                    .params(username=username, token=token, is_reset=is_reset)
                )

                con.commit()

                if result.rowcount == 1:
                    return token
                else:
                    return "error: Email not created"
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def delete(token):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("DELETE FROM email WHERE token = :token")
                    .params(token=token)
                )

                con.commit()

                if result.rowcount == 1:
                    return "success"
                else:
                    return "error: Email not deleted"
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def find_by_token(token):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM email WHERE token = :token")
                    .params(token=token)
                )

                return result.fetchone()
        except Exception as e:
            return e