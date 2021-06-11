export const changeColor = (loading, status, api) => {
  let styles = `
        border-radius: 10px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        background-color: ${api.highPriority};
        `;

  let stylesLow = `
        border-radius: 10px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        background-color: ${api.lowPriority};
        `;

  let stylesMedium = `
        border-radius: 10px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        background-color: ${api.mediumPriority};
        `;
  if (!loading || status.includes("Todos")) {
    document.querySelectorAll("td").forEach((item) => {
      const c = item.childNodes;
      for (let i = 0; i < c.length; i++) {
        if (c[i].nodeValue === "Alta") {
          item.style = styles;
        } else if (c[i].nodeValue === "Media") {
          item.style = stylesMedium;
        } else if (c[i].nodeValue === "Baixa") {
          item.style = stylesLow;
        }
      }
    });
  }
};
