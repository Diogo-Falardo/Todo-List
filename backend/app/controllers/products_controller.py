from sqlalchemy.orm import Session
from typing import Optional
# exceptions
from app.utils.exceptions import THROW_ERROR
# products
from app.services import products_service
from app.models.schemas.product_schema import Category



def create_new_product(payload: dict, user_id: int, db: Session):
    for item, value in payload.items():
        if item == "product_sku":
            if products_service.pSKU(value, user_id,db):
                THROW_ERROR("Product SKU dupplicated!", 400)
        elif item == "product_name":
            if products_service.pName(value, user_id, db):
                THROW_ERROR("Product name already exists!", 400)

    return products_service.insProduct(payload, user_id,db)

def update_product(sku: str, payload: dict, user_id: int, db: Session):
    product = products_service.pSKU(sku,user_id,db)
    if not product:
        THROW_ERROR("Product SKU not found!", 400)

    new_name = payload.get("product_name")
    if new_name and new_name != product.product_name:
        if products_service.pName(new_name,user_id,db):
            THROW_ERROR("Product name already exists!", 400)
    

    return products_service.patchProduct(payload,product,db)


def products(
    category: Optional[Category], search: Optional[str],
    order_dir: str, limit: int, offset:int,
    user_id: int, db: Session
): 
    products = products_service.products(category, search, order_dir, limit, offset, user_id, db)
    if not products:
        THROW_ERROR("No products were found!", 400)
    
    return products

def product(sku: str, user_id: int, db: Session):
    product = products_service.pSKU(sku, user_id,db)
    if not product:
        THROW_ERROR("Product SKU not found!", 400)

    return product