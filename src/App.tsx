import { useMemo, useState } from 'react'

type EmojiItem = {
  symbol: string
  title: string
  keywords: string
}

const emojis: EmojiItem[] = [
  {
    symbol: '💯',
    title: '100',
    keywords: 'Hundred, points, symbol, wow, win, perfect, parties',
  },
  {
    symbol: '🔢',
    title: '1234',
    keywords: 'input symbol for numbers symbol',
  },
  {
    symbol: '🔢',
    title: '1234',
    keywords: 'input symbol for numbers symbol',
  },
]

function App() {
  const [query, setQuery] = useState('')

  const filteredEmojis = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return emojis

    return emojis.filter(({ title, keywords, symbol }) =>
      `${title} ${keywords} ${symbol}`.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <main className="page">
      <header className="hero">
        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>
      </header>

      <section className="finder" aria-label="Emoji search">
        <label className="visually-hidden" htmlFor="emoji-search">
          Search emoji by keyword
        </label>
        <input
          id="emoji-search"
          type="search"
          placeholder="Placeholder"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="emoji-grid" aria-live="polite">
          {filteredEmojis.map((emoji, index) => (
            <article className="emoji-card" key={`${emoji.title}-${index}`}>
              <span className="emoji-symbol" role="img" aria-label={emoji.title}>
                {emoji.symbol}
              </span>
              <h2>{emoji.title}</h2>
              <p>{emoji.keywords}</p>
            </article>
          ))}
          {filteredEmojis.length === 0 && (
            <p className="empty-state">No emoji found</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
