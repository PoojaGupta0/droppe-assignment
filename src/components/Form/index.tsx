import React, { FormEvent } from "react";

import { Button } from "../Button";
import styles from "../../styles/form.module.css";

type Props = {
  "on-submit": (payload: { title: string; description: string; price: string }) => void;
}

export const Form: React.FC<Props> = (props) => {
  let formRef = React.useRef<HTMLFormElement>(null);
  let titleRef = React.useRef<HTMLInputElement>(null);
  let priceRef = React.useRef<HTMLInputElement>(null);
  let descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const formInput = [
    {
      title: "Product title: *",
      inputText: "Title...",
      refrence: titleRef,
    },
    {
      title: "Product details: *",
      inputText: "Title...",
      refrence: priceRef,
    }
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert("Your product needs a title");
      return;
    } else if (!descriptionRef.current?.value || !priceRef.current?.value) {
      alert("Your product needs some content");
      return;
    }

    props["on-submit"]({
      title: titleRef.current && titleRef.current.value,
      description: descriptionRef.current && descriptionRef.current.value,
      price: priceRef.current && priceRef.current.value,
    });

    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
      {formInput.map(field => (
        <>
          <span className={styles.label}>{field.title}</span>
          <input
            ref={field.refrence}
            placeholder={field.inputText}
            defaultValue=""
            className={styles.input}
          />
        </>
      ))}
      <textarea
        ref={descriptionRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />
      <Button>Add a product</Button>
    </form>
  );
};
