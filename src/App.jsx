import React, { useState } from 'react'
import AIColorSuggester from './components/AIColorSuggester'
import AccessibilityChecker from './components/AccessibilityChecker'
import ColorPalette from './components/ColorPalette'

function App() {
  const [currentPalette, setCurrentPalette] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  const handlePaletteGenerated = (palette) => {
    setCurrentPalette(palette)
  }

  const handleColorSelect = (color) => {
    setSelectedColors(prev => {
      const exists = prev.find(c => c.hex === color.hex)
      if (exists) {
        return prev.filter(c => c.hex !== color.hex)
      } else {
        return [...prev, color]
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-900">
                  🎨 ChromaStudio
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  AI-Enhanced Color Toolkit
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                For Designers • Developers • Brands
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Color Suggester */}
          <div className="lg:col-span-1">
            <AIColorSuggester onPaletteGenerated={handlePaletteGenerated} />
          </div>

          {/* Color Palette Display */}
          <div className="lg:col-span-1">
            <ColorPalette 
              palette={currentPalette} 
              onColorSelect={handleColorSelect}
              selectedColors={selectedColors}
            />
          </div>

          {/* Accessibility Checker */}
          <div className="lg:col-span-1">
            <AccessibilityChecker 
              selectedColors={selectedColors}
              palette={currentPalette}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ✨ Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold text-lg mb-2">AI Color Generator</h3>
              <p className="text-gray-600 text-sm">
                Smart color palette suggestions based on themes and preferences
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="font-semibold text-lg mb-2">Accessibility Checker</h3>
              <p className="text-gray-600 text-sm">
                Real-time WCAG AA/AAA compliance with contrast ratios
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="font-semibold text-lg mb-2">Color Science</h3>
              <p className="text-gray-600 text-sm">
                Advanced color manipulation using color.js library
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="font-semibold text-lg mb-2">API Ready</h3>
              <p className="text-gray-600 text-sm">
                Designed to scale with REST APIs or Supabase backends
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Built with React, Tailwind CSS, and color.js</p>
            <p className="mt-2 text-sm">
              Bridging the gap between design consistency and accessibility compliance
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
