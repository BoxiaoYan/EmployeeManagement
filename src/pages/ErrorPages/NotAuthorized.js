import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotAuthorized() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to="/">
          <Button type="primary" size="large">
            Back Home
          </Button>
        </Link>
      }
    />
  );
}