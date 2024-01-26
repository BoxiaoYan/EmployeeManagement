import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styles from "./style.module.css";

export default function AuthForm({ buttonText, onSubmit, title, fields }) {
  return (
    <div className={styles.container}>
      <Form className={styles.form} onFinish={onSubmit} autoComplete="off">
        <Typography className={styles.title}>{title}</Typography>
        {fields.map((field) => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.type === "email" ? (
              <Input
                className={styles.input}
                placeholder={field.placeholder}
                prefix={field.prefix}
                size="large"
                rules={field.rules}
                defaultValue={field.defaultValue}
                readOnly
              />
            ) : field.type === "text" ? (
              <Input
                className={styles.input}
                placeholder={field.placeholder}
                prefix={field.prefix}
                size="large"
                rules={field.rules}
              />
            ) : (
              <Input.Password
                className={styles.input}
                placeholder={field.placeholder}
                prefix={<LockOutlined />}
                size="large"
                rules={field.rules}
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.btn}
            size="large"
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
