import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

function createConfig(props) {
  let config = {};

  if (props.fps) config.fps = props.fps;

  if (props.qrbox) config.qrbox = props.qrbox;

  if (props.aspectRatio) config.aspectRatio = props.aspectRatio;

  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;

  if (props.showTorchButtonIfSupported !== undefined)
    config.showTorchButtonIfSupported = props.showTorchButtonIfSupported;

  if (props.showZoomSliderIfSupported !== undefined)
    config.showZoomSliderIfSupported = props.showZoomSliderIfSupported;

  return config;
}

function Scanner(props) {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required callback");
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    return () => {
      html5QrcodeScanner.clear().catch((err) => {
        console.error("Failed to clear html5QrcodeScanner.", err);
      });
    };
  }, []);
  return <div id={qrcodeRegionId} />;
}

export default Scanner;
