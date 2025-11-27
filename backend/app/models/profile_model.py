from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import INTEGER

from ._base import Base


class Profile(Base):
    __tablename__ = "profile"

    user_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("auth.id", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
    )

    username = Column(String(100), nullable=False)
    country = Column(String(100))
    plan = Column(String(50))

    user = relationship("Auth", back_populates="profile", lazy="joined")

    def __repr__(self):
        return f"<Profile(user_id={self.user_id}, username='{self.username}', plan='{self.plan}')>"
