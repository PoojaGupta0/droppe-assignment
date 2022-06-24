import React from "react";
import lodash from 'lodash';
import { ProductDetails } from "./ProductDetails"

type Product = {
   category?: string;
   description: string;
   id?: number;
   image?: string;
   price: string;
   rating?: { rate: number; count: number };
   title: string;
   isFavorite?: boolean
  }

interface Props {
  products: Product[];
  onFav: (title: string) => void;
}


export const ProductList: React.FC<Props> = ({products, onFav}) => {
    let productsData: any[] = []

    products.forEach((product, index) => {
      productsData.push(
        <ProductDetails key={index} index={index} product={product} onFav={onFav} />
      )
    })

    return <div>{lodash.reverse(productsData)}</div>
}

