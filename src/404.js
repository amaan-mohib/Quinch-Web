import React from "react";
export default function NotFound() {
  return (
    <div id="message">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <p>
        The specified file was not found on this website. Please check the URL
        for mistakes and try again.
      </p>
      <h3>Why am I seeing this?</h3>
      <p>A requested may not exist or the page was deleted</p>
    </div>
  );
}
