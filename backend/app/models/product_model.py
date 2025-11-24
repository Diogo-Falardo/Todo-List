from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    Enum,
    ForeignKey,
    Numeric,
)
from sqlalchemy.orm import relationship

from ._base import Base


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_user_id = Column(Integer, ForeignKey("auth.id"), nullable=False)

    product_sku = Column(String(64), nullable=False, unique=True)
    product_name = Column(String(255), nullable=False)
    product_sell_price = Column(Numeric(10, 2), nullable=False)
    product_cost = Column(Numeric(10, 2), nullable=False)
    product_category = Column(String(100), nullable=False)
    product_description = Column(Text, nullable=True)
    product_supplier = Column(String(255), nullable=True)

    product_created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    product_updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # relations
    user = relationship("Auth", lazy="joined")
    stock = relationship("ProductStock", back_populates="product", uselist=False)

    def __repr__(self):
        return f"<Product(id={self.product_id}, sku='{self.product_sku}', name='{self.product_name}')>"


class ProductStock(Base):
    __tablename__ = "product_stock"

    product_stock_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)

    product_discount = Column(Numeric(5, 2), nullable=True)  
    product_unit_of_measure = Column(String(20), nullable=True)
    product_weight = Column(Numeric(10, 3), nullable=True)   
    product_stock_quantity = Column(Numeric(10, 2), nullable=False, default=0)
    product_minimum_stock_level = Column(Numeric(10, 2), nullable=True)
    product_maximum_stock_level = Column(Numeric(10, 2), nullable=True)
    product_reorder_point = Column(Numeric(10, 2), nullable=True)
    product_last_restock_date = Column(DateTime, nullable=True)
    product_state = Column(
        Enum(
            "active",
            "inactive",
            "out_of_stock",
            "discontinued",
            name="product_state_enum",
        ),
        nullable=False,
        default="active",
    )

    product = relationship("Product", back_populates="stock")

    def __repr__(self):
        return f"<ProductStock(id={self.product_stock_id}, product_id={self.product_id}, qty={self.product_stock_quantity})>"
