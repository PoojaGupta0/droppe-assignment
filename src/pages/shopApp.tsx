import React, { useState, useEffect } from "react";
import lodash from 'lodash';

import { AddProductModal } from "../components/Modal";
import { Button } from "../components/Button";
import { ProductList } from "../components/ProductList/ProductList";
import { Product } from "../components/types";
import logo from "../images/droppeLogo.png";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import styles from "../styles/shopApp.module.css";

export const ShopApp: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products").then((response) => {
      if (response) {
        response.json().then((rawData) => {
          setProducts(rawData);
          setProductCount(rawData.length);
        });
      }
    });
  }, []);

  const favClick = (title: string) => {
    const index = lodash.findIndex(products, { title });
    let currentFavs = numFavorites;
    if (products[index].isFavorite) {
      products[index].isFavorite = false;
      setNumFavorites(--currentFavs);
    } else {
      setNumFavorites(++currentFavs)
      products[index].isFavorite = true;
    }
  };

  const handleModal = () => {
    setOpenModel(!openModel);
  };

  const onSubmit = (payload: Product) => {
    const newProduct = {
      title: payload.title,
      description: payload.description,
      price: payload.price,
    };

    setProducts([...products, newProduct]);
    setProductCount(products.length + 1);
    setOpenModel(false);
    setIsShowingMessage(true);
    setMessage("Adding Product...");

    // **this POST request doesn't actually post anything to any database**
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (res) res.json()
      })
      .then((json) => {
        (function () {
          setTimeout(() => {
            setIsShowingMessage(false);
            setMessage("");
          }, 2000);
        })();
      });
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={`container ${styles.headerImageWrapper}`}>
          <img data-testid="droppeLogo" alt="droppe_logo" src={logo} className={styles.headerImage} />
        </div>
      </div>
      <span className={`container ${styles.main} ${styles.mainImg}`}>
        <img data-testid="img1" alt="img1" src={img1} />
        <img data-testid="img2" alt="img2" src={img2} />
      </span>
      <div className={`container ${styles.main} ${styles.btnDiv}`}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button
              onClick={handleModal}
            >
              Send product proposal
            </Button>
          </span>
          {
            isShowingMessage &&
            <div className={styles.messageContainer}>
              <i>{message}</i>
            </div>
          }
        </div>
        <div className={styles.statsContainer}>
          <span>Total products: {productCount}</span>
          {' - '}
          <span>Number of favorites: {numFavorites}</span>
        </div>
        {products && products.length && <ProductList products={products} onFav={favClick} />}
      </div>
      <AddProductModal openModel={openModel} handleModal={handleModal} onSubmit={onSubmit} />
    </React.Fragment>
  );
}
