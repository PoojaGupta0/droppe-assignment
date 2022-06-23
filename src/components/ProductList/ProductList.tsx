import React from "react";
import lodash from 'lodash';
import { ProductDetails } from "./ProductDetails"

interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}


export const ProductList: React.FC<IPostsProps> = (props: IPostsProps) => {
    let productsarr = []

    for (const [i, p] of props.products.entries()) {
      productsarr.push(
        <ProductDetails key={i} index={i} product={p} onFav={props.onFav} />
      );
    }
    return <div>{lodash.reverse(productsarr)}</div>
}

