import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(WS_URL); //send the token in params like `${WS_URL}?token=...`
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
