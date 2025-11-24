from sqlalchemy import or_
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import Optional
# utils: excepitions
from app.utils.exceptions import THROW_ERROR
# products
from app.models.product_model import Product, ProductStock
from app.models.schemas.product_schema import productBasePlus, Category

# check

def pSKU(sku: str, user_id: int, db: Session):
    product = db.query(Product).filter(Product.product_user_id == user_id, Product.product_sku == sku).first()
    if not product:
        return False
    
    return product

def pName(product_name: str, user_id: int, db:Session):
    product = db.query(Product).filter(Product.product_user_id == user_id, Product.product_name == product_name).first()
    if not product:
        return False
    
    return product

# inserts

def insProduct(product: dict, user_id: int, db: Session):
    
    try:
        new_product = Product(
            product_user_id = user_id,
            product_sku = product["product_sku"],
            product_name = product["product_name"],
            product_sell_price = product["product_sell_price"],
            product_cost = product["product_cost"],
            product_category = product["product_category"],
            product_description = product.get("product_description"),
            product_supplier = product.get("product_supplier"),
        )

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return new_product
    except SQLAlchemyError:
        db.rollback()
        THROW_ERROR("Error while inserting new product..", 500)

    
# update

def patchProduct(payload: dict, product: Product, db: Session):
    try:
        if "product_name" in payload:
            product.product_name = payload["product_name"]
        if "product_sell_price" in payload:
            product.product_sell_price = payload["product_sell_price"]
        if "product_cost" in payload:
            product.product_cost = payload["product_cost"]
        if "product_category" in payload:
            product.product_category = payload["product_category"]
        if "product_description" in payload:
            product.product_description = payload["product_description"]
        if "product_supplier" in payload:
            product.product_supplier = payload["product_supplier"]

        db.commit()
        db.refresh(product)
        return product
    except SQLAlchemyError:
        db.rollback()
        THROW_ERROR("Error while updating product...", 500)

# get

def products(
    category: Optional[Category], search: Optional[str],
    order_dir: str, limit: int, offset:int,
    user_id: int, db: Session
):
    products = db.query(Product).filter(Product.product_user_id == user_id)

    if category is not None:
        products = products.filter(Product.product_category == category.value)

    if search:
        pattern = f"%{search}%"
        products = products.filter(
            or_(
                Product.product_name.ilike(pattern),
                Product.product_sku.ilike(pattern),
            )
        )

    if order_dir == "asc":
        products = products.order_by(Product.product_created_at.asc())
    elif order_dir == "desc":
        products = products.order_by(Product.product_created_at.desc())


    products = products.offset(offset).limit(limit)

    return products.all()

