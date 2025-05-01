// Dentro de src/react-lazy-load-image-component.d.ts
declare module 'react-lazy-load-image-component' {
  import * as React from 'react';

  // Declaração mínima para LazyLoadImageProps (usando 'any' por simplicidade agora)
  // Isso evita o erro TS2709 que tivemos antes.
  export type LazyLoadImageProps = any;

  // Alternativa (um pouco mais segura se não quiser 'any'):
  // export interface LazyLoadImageProps {
  //   // Você pode adicionar propriedades aqui se souber quais são essenciais,
  //   // mas deixar vazio {} também pode funcionar dependendo do uso.
  //   // Ex: src?: string; alt?: string; effect?: string; etc.
  // }

  // Declara também o componente principal que você importa
  export const LazyLoadImage: React.FunctionComponent<LazyLoadImageProps>;

  // Se você importar outros componentes ou tipos deste módulo, declare-os aqui também.
  // Ex: export const trackWindowScroll: any; (se usar isso)
}
