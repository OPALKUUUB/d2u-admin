import React from "react";
import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";
import { useNavigate } from "react-router-dom";

export const Bell = () => {
  let navigate = useNavigate();
  return (
    <MagicBell
      apiKey="c2cb12a6926a8cf70819eaf74181d85c779d2ab0"
      userEmail="makara.atipat@gmail.com"
      theme={theme}
      locale="en"
    >
      {(props) => (
        <FloatingNotificationInbox
          width={400}
          height={500}
          {...props}
          onNotificationClick={() => navigate("/yahoo/orders")}
        />
      )}
    </MagicBell>
  );
};

const theme = {
  icon: { borderColor: "#ffffff", width: "24px" },
  unseenBadge: { backgroundColor: "#DF4759" },
  header: {
    backgroundColor: "#15171c",
    textColor: "#ffffff",
    borderRadius: "16px",
  },
  footer: {
    backgroundColor: "#15171c",
    textColor: "#ffffff",
    borderRadius: "16px",
  },
  notification: {
    default: {
      textColor: "#15091F",
      borderRadius: "8px",
      backgroundColor: "#15171c",
    },
    unseen: { backgroundColor: "#15171c" },
    unread: { backgroundColor: "#15171c" },
  },
};
