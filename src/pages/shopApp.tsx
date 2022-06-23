import React, { useState, useEffect } from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "../components/Button/Button";
import { ProductList } from "../components/ProductList/ProductList";
import { Form } from "../components/Form/Form";
import logo from "../images/droppeLogo.png";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import styles from "../styles/shopApp.module.css";

export const ShopApp: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [prodCount, setProdCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products").then((response) => {
      let jsonResponse = response.json();
      jsonResponse.then((rawData) => {
        let data = [];
        for (let i = 0; i < rawData.length; i++) {
          let updatedProd = rawData[i];
          data.push(updatedProd);
        }
        setProducts([...data]);
        setProdCount(data.length);
      });
    });
  }, []);

  const favClick = (title: string) => {
    const prods = products;
    const idx = lodash.findIndex(prods, { title: title });
    let currentFavs = numFavorites;
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }
    setProducts(prods);
    setNumFavorites(totalFavs);
  };

  const handleModal = () => {
    setOpenModel(!openModel);
  };

  const onSubmit = (payload: {
    title: string | null;
    description: string | null;
    price: string | null;
  }) => {
    const updated = lodash.clone(products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price,
    });
    setProducts([...updated]);
    setProdCount(lodash.size(products) + 1);
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
          <div className={['container', styles.headerImageWrapper].join(' ')}>
            <img alt="droppe_logo" src={logo} className={styles.headerImage} />
          </div>
        </div>
        <>
          <span
            className={['container', styles.main].join(' ')}
            style={{ margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly' }}
          >
            <img alt="img1" src={img1} style={{ maxHeight: "15em", display: 'block' }} />
            <img alt="img2" src={img2} style={{ maxHeight: "15rem", display: 'block' }} />
          </span>
        </>
        <div className={['container', styles.main].join(' ')} style={{ paddingTop: 0 }}>
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
            <span>Total products: {prodCount}</span>
            {' - '}
            <span>Number of favorites: {numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onFav={favClick} /> : <div></div>}
        </div>
        <>
          <Modal
            isOpen={openModel}
            className={styles.reactModalContent}
            overlayClassName={styles.reactModalOverlay}
          >
            <div className={styles.modalContentHelper}>
              <div
                className={styles.modalClose}
                onClick={() => handleModal()}
              >
                <FaTimes />
              </div>
              <Form
                on-submit={onSubmit}
              />
            </div>
          </Modal>
        </>
      </React.Fragment>
    );
}
