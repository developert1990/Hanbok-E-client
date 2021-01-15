import React from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../types";
import { CustomRating } from "./CustomRating";
import { Card } from "react-bootstrap";

export interface ProductProps {
    product: ProductType;
}

// console.log('process.env.API_BASE', API_BASE)

export const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="single_product">


            <div key={product._id}>
                <div className="blog-item fourth" title="Suspendisse potenti">
                    <div className="blog-item-img"
                    ><Link to={`/product/${product._id}`}>
                            <Card.Img
                                height="100%"
                                className="products__image"
                                src={`${product.image}`}
                                variant="top"
                            />

                        </Link></div>
                    <div className="blog-item-content">
                        <span className="blog-item-label">{product.category}</span>
                        <div className="origin_p_tag">
                            <span className="date">Stock: {product.countInStock}</span>
                            <span className="rating__part">
                                <CustomRating rating={product.rating} />
                                {product.numReviews} Reviews
                            </span>
                            <span className="price">CAD $ {product.price}</span>
                            <Link className="productName" to={`/product/${product._id}`}>
                                <div>{product.name}</div>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
