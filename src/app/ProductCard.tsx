import Image from 'next/image'

import type { Product } from './(navigation)/page'

import { format투자금액, format투자기간 } from './util/format'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <li key={product.index}>
      <a href={`https://8percent.kr/deals/${product.index}`} target="_blank">
        <Image
          alt={product.title}
          className="aspect-video rounded object-cover transition hover:brightness-75"
          height={550}
          src={
            product.thumbnail ??
            'https://cdn-media.8percent.kr/deal/CSAHk2iQVB4zS6tzxQ2K1gbgcOIdJ0_Deal_page1.jpg'
          }
          width={550}
        />
        <h4 className="mt-3 truncate">{product.title}</h4>
        <div>
          <span className="relative top-[-1px] text-xs">연 </span>
          <span
            className={`font-bold ${product.earningRate >= 9 ? 'text-violet-600 dark:text-violet-400' : ''}`}
          >
            {product.earningRate}%
          </span>
        </div>
        <div className="mt-2 flex gap-1 text-xs text-gray-400 dark:text-gray-500">
          <span>{format투자금액(product.amount)}</span>·
          <span>{format투자기간(product.length)}</span>
        </div>
      </a>
    </li>
  )
}

export function ProductCardSkeleton() {
  return (
    <li>
      <div className="aspect-video rounded bg-gray-200 dark:bg-gray-800" />
      <h4 className="mt-3 h-6 bg-gray-200 dark:bg-gray-800" />
      <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-800" />
      <div className="mt-2 flex gap-1 text-xs text-gray-400 dark:text-gray-500">
        <span className="h-4 w-12 bg-gray-200 dark:bg-gray-800" />
        <span className="h-4 w-12 bg-gray-200 dark:bg-gray-800" />
      </div>
    </li>
  )
}
