export const openPopUpWindow = (url: string) => {
  const width = 1000;
  const height = 600;

  const parentWidth = window.outerWidth;
  const parentHeight = window.outerHeight;
  const parentLeft = window.screenX || window.screenLeft;
  const parentTop = window.screenY || window.screenTop;

  const left = parentLeft + (parentWidth / 2) - (width / 2);
  const top = parentTop + (parentHeight / 2) - (height / 2);

  const windowFeatures =
    `menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=${width},height=${height},top=${top},left=${left}`;

  const popUpWindow = window.open(url, "GitHubIntegration", windowFeatures);
  return popUpWindow;
};
