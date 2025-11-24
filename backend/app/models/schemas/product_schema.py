from pydantic import BaseModel, field_validator, ConfigDict
from datetime import datetime
from typing import Optional
from decimal import Decimal
from enum import Enum
# utils: validators
from app.utils import field_V


# product

class Category(str, Enum):
    electronics = "electronics"
    clothing = "clothing"
    books = "books"
    home = "home"
    tools = "tools"
    others = "others"

class productBase(BaseModel):
    product_sku: str
    product_name: str
    product_sell_price: Decimal
    product_cost: Decimal
    product_category: Category

    
    @field_validator("product_sku", mode="before")
    @classmethod
    def _product_sku(cls, product_sku):
        return field_V.vString(product_sku, title="SKU", maxlen=64)
    
    @field_validator("product_name", mode="before")
    @classmethod
    def _product_name(cls, product_name):
        return field_V.vString(product_name, title="product name", maxlen=100)

    @field_validator("product_sell_price", mode="before")
    @classmethod
    def _product_sell_price(cls,product_sell_price):
        return field_V.vDecimal(product_sell_price, title="product sell price")
    
    @field_validator("product_cost", mode="before")
    @classmethod
    def _product_cost(cls, product_cost):
        return field_V.vDecimal(product_cost, title="product cost")
    
    

class productBasePlus(productBase):
    product_description: Optional[str] = None
    product_supplier: Optional[str] = None

    @field_validator("product_description", mode="before")
    @classmethod
    def _product_description(cls, product_description):
        return field_V.vString(product_description, title="product description", maxlen=500, allow_none=True)
    
    @field_validator("product_supplier", mode="before")
    @classmethod
    def _product_supplier(cls, product_supplier):
        return field_V.vString(product_supplier, title="product supplier", maxlen=200, allow_none=True)

class productBasePlusUpdate(BaseModel):
    product_sku: str
    product_name: Optional[str] = None
    product_sell_price: Optional[Decimal] = None
    product_cost: Optional[Decimal] = None
    product_category: Optional[str] = None
    product_description: Optional[str] = None
    product_supplier: Optional[str] = None

    
    @field_validator("product_sku", mode="before")
    @classmethod
    def _product_sku(cls, product_sku):
        return field_V.vString(product_sku, title="SKU", maxlen=64)
    
    @field_validator("product_name", mode="before")
    @classmethod
    def _product_name(cls, product_name):
        return field_V.vString(product_name, title="product name", maxlen=100, allow_none=True)

    @field_validator("product_sell_price", mode="before")
    @classmethod
    def _product_sell_price(cls,product_sell_price):
        return field_V.vDecimal(product_sell_price, title="product sell price", allow_none=True)
    
    @field_validator("product_cost", mode="before")
    @classmethod
    def _product_cost(cls, product_cost):
        return field_V.vDecimal(product_cost, title="product cost", allow_none=True)
    
    @field_validator("product_category", mode="before")
    @classmethod
    def _product_category(cls, product_category):
        return field_V.vSString(product_category, title="product category", maxlen=15, allow_none=True)
    
    @field_validator("product_description", mode="before")
    @classmethod
    def _product_description(cls, product_description):
        return field_V.vString(product_description, title="product description", maxlen=500, allow_none=True)
    
    @field_validator("product_supplier", mode="before")
    @classmethod
    def _product_supplier(cls, product_supplier):
        return field_V.vString(product_supplier, title="product supplier", maxlen=200, allow_none=True)


# out
class productOut(productBasePlus):
    product_created_at: datetime
    product_updated_at: datetime

# product stock

class productStockBase(BaseModel):
    product_id: int
    product_stock_quantity: int

    @field_validator("product_id", mode="before")
    @classmethod
    def _product_id(cls, product_id):
        return field_V.vID(product_id)
    
    @field_validator("product_stock_quantity", mode="before")
    @classmethod
    def _product_stock_quantity(cls, product_stock_quantity):
        return field_V.vInt(product_stock_quantity, title="product stock quantity")
    

class productStockBasePlus(productBase):
    product_discount: Optional[Decimal] = None
    product_unit_of_measure: Optional[str] = None
    product_weight: Optional[Decimal] = None
    product_minimum_stock_level: Optional[int] = None
    product_maximum_stock_level: Optional[int] = None
    product_reorder_point: Optional[int] = None
    product_last_restock_date: Optional[datetime] = None

    @field_validator("product_discount", mode="before")
    @classmethod
    def _product_discount(cls, product_discount):
        return field_V.vDecimal(product_discount, title="product discount", maxNumber=100)
    
    @field_validator("product_unit_of_measure", mode="before")
    @classmethod
    def _product_unit_of_measure(cls, product_unit_of_measure):
        return field_V.vString(product_unit_of_measure, title="product unit of measure", maxLen=20)
    
    @field_validator("product_weight", mode="before")
    @classmethod
    def _product_weight(cls, product_weight):
        return field_V.vDecimal(product_weight, title="product weight")
    
    @field_validator("product_minimum_stock_level", mode="before")
    @classmethod
    def _product_minimum_stock_level(cls, product_minimum_stock_level):
        return field_V.vInt(product_minimum_stock_level, title="product minimum stock level")
    
    @field_validator("product_maximum_stock_level", mode="before")
    @classmethod
    def _product_maximum_stock_level(cls, product_maximum_stock_level):
        return field_V.vInt(product_maximum_stock_level, "product maximum stock level")
    
    @field_validator("product_reorder_point", mode="before")
    @classmethod
    def _product_reorder_point(cls, product_reorder_point):
        return field_V.vInt(product_reorder_point, title="product reorder point")

# out 
class productStockOut(productStockBasePlus):
    product_state: str