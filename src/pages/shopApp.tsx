import React, { useState, useEffect } from "react";
import lodash from 'lodash';
import { AddProductModal } from "../components/Modal";
import { Button } from "../components/Button";
import { ProductList } from "../components/ProductList/ProductList";
import logo from "../images/droppeLogo.png";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import styles from "../styles/shopApp.module.css";

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
  

export const ShopApp: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products").then((response) => {
      response.json().then((rawData) => {        
        setProducts(rawData);
        setProductCount(rawData.length);
      });
    });
  }, []);

  const favClick = (title: string) => {
    const index = lodash.findIndex(products, { title: title });
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

  const onSubmit = (payload:Product) => {
    const updated = lodash.clone(products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price,
    });

    setProducts([...updated]);
    setProductCount(lodash.size(products) + 1);
    setOpenModel(false);
    setIsShowingMessage(true);
    setMessage("Adding Product...");
    
    // **this POST request doesn't actually post anything to any database**
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        price: payload.price,
        description: payload.description,
      }),
    })
      .then((res) => res.json())
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
            <img alt="droppe_logo" src={logo} className={styles.headerImage} />
          </div>
        </div>
          <span
            className={`container ${styles.main} ${styles.mainImg}`}
          >
            <img alt="img1" src={img1} />
            <img alt="img2" src={img2} />
          </span>
        <div className={`container ${styles.main} ${styles.btnDiv}`} >
          <div className={styles.buttonWrapper}>
            <span role="button">
              <Button
                onClick={() => handleModal()}
              >Send product proposal</Button>
            </span>
            {isShowingMessage && <div className={styles.messageContainer}>
              <i>{message}</i>
            </div>}
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
