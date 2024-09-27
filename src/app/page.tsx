import Image from 'next/image'

type Product = {
  index: number
  title: string
  /** 투자금액 (원) */
  amount: number
  /** 투자기간 (개월) */
  length: number
  /** 연 수익률 */
  earningRate: number
  thumbnail: string
}

async function getProducts() {
  const res = await fetch('https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test')
  return (await res.json()) as Product[]
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="p-5">
      <h3 className="text-2xl font-bold">지난 투자 상품</h3>
      <ul className="mb-7 mt-6">
        <li>전체</li>
        <li>부동산</li>
        <li>스페셜 딜</li>
      </ul>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {products.map((product) => (
          <li key={product.index}>
            <Image
              alt={product.title}
              className="aspect-video rounded object-cover"
              height={500}
              src={
                product.thumbnail ??
                'https://cdn-media.8percent.kr/deal/CSAHk2iQVB4zS6tzxQ2K1gbgcOIdJ0_Deal_page1.jpg'
              }
              width={500}
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
          </li>
        ))}
      </ul>
    </main>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

function format투자금액(value: number) {
  if (value < 100000000) return `${formatCurrency(value / 10000)}만원`

  const unit = Math.floor(value / 100000000)
  const rest = value % 100000000

  return `${formatCurrency(unit)}억 ${formatCurrency(rest / 10000)}만원`
}

function format투자기간(value: number) {
  if (value <= 12) return `${value} 개월`

  const years = Math.floor(value / 12)
  const months = value % 12

  return `${years}년 ${months}개월`
}
