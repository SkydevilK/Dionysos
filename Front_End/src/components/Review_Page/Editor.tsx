import React, { useRef, useEffect } from "react";
import * as Q from "quill";
const Quill = Q.default || Q;
// const Quill: any = Q;
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({}));
export default function Editor() {
  const quillElement = useRef<any>();
  const quillInstance = useRef<any>();
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ]
      },
      placeholder: "Compose an epic...",
      theme: "snow" // or 'bubble'
    });
  });
  return <div ref={quillElement} />;
}
