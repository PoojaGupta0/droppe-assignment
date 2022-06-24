import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/productList.module.css";

type Product = { 
      title: string; 
      description: string; 
      price: string; 
      isFavorite?: boolean; 
      rating?: { rate: number; count: number } 
}

interface Props {
     index: number;
     product: Product;
     onFav: (title: string) => void;
}

export const ProductDetails: React.FC<Props> = ({ product, onFav }) => {
    const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles

    return (
      <span className={productClass}>
        <span className={styles['product-title']}>{product.title}</span>
        <p><b>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</b></p>
        <p><b>Price: ${+product.price}</b></p>
        <p className={productBody}>
        <b>Description:</b>
          <br />
          {product.description}
        </p>
        <span className={styles.action_bar}>
          <span
            className={`${actionBarItem} ${product.isFavorite ? "active" : ""
              }`}
            role="button"
            onClick={() => {
              onFav(product.title);
            }}
          >
            <FaStar /> 
            <span className={actionBarItemLabel}>{(product.isFavorite) ? 'Remove from favorites' : 'Add to favorites'}</span>
          </span>
        </span>
      </span>
    );
  };
  