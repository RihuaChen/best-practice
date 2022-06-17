declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'mockjs';
declare module 'draft-js';
declare module 'draftjs-to-html';
declare module 'react-draft-wysiwyg';
declare module 'html-to-draftjs';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'omit.js';
declare module 'uuid';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}

interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
  loadBerlinPageCallback: () => void;
  _XFLOW_;
  __POWERED_BY_QIANKUN__: string;
  __webpack_public_path__: string;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}

declare let ga: () => void;

declare const REACT_APP_ENV: 'dev' | 'dev2' | 'dev3' | false;
