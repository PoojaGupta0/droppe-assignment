import React from "react";

import { Product } from "../types";
import { ProductDetails } from "./ProductDetails"

interface Props {
  products: Product[];
  onFav: (title: string) => void;
}

export const ProductList: React.FC<Props> = ({ products, onFav }) => {
  let productsData: Product[] = products.reverse()

  return (
    <div>
      {
        productsData.map((product, index) => {
          return <ProductDetails key={index} product={product} onFav={onFav} />
        })
      }
    </div>
  )
}
