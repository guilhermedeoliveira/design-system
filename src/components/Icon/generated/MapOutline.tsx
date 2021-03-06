import React from 'react'

const SvgMapOutline = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width='1em' height='1em' viewBox='0 0 24 24' {...props}>
    <path d='M8.704 4c.332-.001.764.067 1.296.203l4.95 1.183 4.519-1.298a2.09 2.09 0 011.792.302c.47.34.739.851.739 1.4v11.338c0 .783-.548 1.467-1.364 1.702l-4.32 1.084a4.453 4.453 0 01-.898.086c-.332.001-.7-.043-1.102-.134L9 18.612l-4.469 1.307c-.19.054-.387.081-.584.081-.433 0-.86-.132-1.208-.385-.47-.34-.739-.85-.739-1.4V7.088c0-.785.548-1.469 1.365-1.702l4.086-1.183c.503-.134.92-.202 1.253-.203zM4 7.125v10.79l4-1.099V6L4 7.125zm12 0v10.79l4-1.099V6l-4 1.125zm-2 0L10 6v10.816l4 1.1V7.124v.001z' />
  </svg>
)

export default SvgMapOutline
