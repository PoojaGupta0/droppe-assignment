import React from "react";
import lodash from 'lodash';

import { Product } from "../types";
import { ProductDetails } from "./ProductDetails"

interface Props {
  products: Product[];
  onFav: (title: string) => void;
}

export const ProductList: React.FC<Props> = ({ products, onFav }) => {
  let productsData: any[] = []

  products.forEach((product, index) => {
    productsData.push(
      <ProductDetails key={index} index={index} product={product} onFav={onFav} />
    )
  })

  return <div>{lodash.reverse(productsData)}</div>
}
