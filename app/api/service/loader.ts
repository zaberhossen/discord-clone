const LOADER = {
  show: () => {
    if (typeof window !== "undefined") {
      document.dispatchEvent(
        new CustomEvent("loaderPortal", {
          detail: { status: true },
        }),
      );
    }
  },
  hide: () => {
    if (typeof window !== "undefined")
      document.dispatchEvent(
        new CustomEvent("loaderPortal", {
          detail: { status: false },
        }),
      );
  },
};
export default LOADER;
