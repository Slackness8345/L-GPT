import * as ReactScrollToBottom from "./index";
import * as React from "react";
import ReactDOM from "react-dom";

// TODO: This is for testing only. Don't use it in production environment unless we have isomorphic React.
window.React = React;
window.ReactDOM = ReactDOM;

(window as any).ReactScrollToBottom = ReactScrollToBottom;
