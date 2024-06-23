import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectPage({ destination }) {
  const navigate = useNavigate();

  useEffect(() => navigate(destination), []);

  return <div>Redirecting to {destination}...</div>;
}
