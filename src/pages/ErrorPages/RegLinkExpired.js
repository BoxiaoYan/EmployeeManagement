// import React from "react";
// import { Result } from "antd";

// export default function RegLinkExpired() {
//   return (
//     <Result
//       title="Your link has expired. Please contact HR to resend a link."
//     />
//   );
// }

import React from "react";
import { Result } from "antd";

export default function RegLinkExpired({ errorMsg }) {
  return <Result style={{ marginTop: "20%" }} title={errorMsg} />;
}