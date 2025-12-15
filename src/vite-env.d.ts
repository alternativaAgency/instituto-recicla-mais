/// <reference types="vite/client" />

declare module '*.geojson' {
  const value: string; // URL string when using ?url
  export default value;
}

declare module '*.geojson?url' {
  const value: string;
  export default value;
}

