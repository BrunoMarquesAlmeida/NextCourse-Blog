import { useRef, useState, useEffect } from "react";

import Notification from "../ui/notification";

import styles from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something wen wrong!");
  }
}

export default function ContactForm() {
  const enteredEmail = useRef();
  const enteredName = useRef();
  const enteredMessage = useRef();

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  // useEffect(() => {
  //   if (requestStatus === "success" || requestStatus === "error") {
  //     const timer = setTimeout(() => {
  //       setRequestError(null);
  //       setRequestStatus(null);
  //     }, 3000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // });

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail.current.value,
        name: enteredName.current.value,
        message: enteredMessage.current.value,
      });

      setRequestStatus("success");

      enteredName.current.value = "";
      enteredEmail.current.value = "";
      enteredMessage.current.value = "";
    } catch (err) {
      setRequestStatus("error");
      setRequestError(err.message);
    }
  }

  let notificationData;

  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Your message was sent successfully",
    };
  }

  if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>

      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={enteredEmail} />
          </div>

          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={enteredName} />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea rows="5" id="message" required ref={enteredMessage} />
        </div>

        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
}
