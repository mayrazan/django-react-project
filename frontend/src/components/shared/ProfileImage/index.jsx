import { ContainerImageStyled } from "./style";
// import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    "&.MuiAvatar-root": {
      width: "100%",
      height: "100%",
    },
  },
}));

export default function ProfileImage({ preview, setPreview }) {
  const classes = useStyles();

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      let src = URL.createObjectURL(e.target.files[0]);
      let preview = document.getElementById("imagem");
      preview.src = src;
      preview.style.borderRadius = "50%";

      setPreview({ prev: e.target.files[0], src: src });
    }
  };
  return (
    <ContainerImageStyled>
      <label htmlFor="fileInput">
        <Avatar className={classes.root}>
          <img alt="" id="imagem" src={""} />
        </Avatar>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </ContainerImageStyled>
  );
}
