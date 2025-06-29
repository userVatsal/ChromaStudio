import React, { useState, useEffect } from 'react'
import Color from 'color'

const AccessibilityChecker = ({ selectedColors, palette }) => {
  const [testResults, setTestResults] = useState([])
  const [overallScore, setOverallScore] = useState(0)
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (selectedColors.length >= 2) {
      performAccessibilityTests()
    } else {
      setTestResults([])
      setOverallScore(0)
      setRecommendations([])
    }
  }, [selectedColors])

  const performAccessibilityTests = () => {
    const results = []
    let totalScore = 0
    const totalTests = selectedColors.length * (selectedColors.length - 1) / 2

    // Test all color combinations
    for (let i = 0; i < selectedColors.length; i++) {
      for (let j = i + 1; j < selectedColors.length; j++) {
        const color1 = selectedColors[i]
        const color2 = selectedColors[j]
        
        const contrast = calculateContrast(color1.hex, color2.hex)
        const wcagAA = contrast >= 4.5
        const wcagAAA = contrast >= 7.0
        
        const testResult = {
          color1,
          color2,
          contrast: contrast.toFixed(2),
          wcagAA,
          wcagAAA,
          score: wcagAAA ? 100 : wcagAA ? 70 : 30
        }
        
        results.push(testResult)
        totalScore += testResult.score
      }
    }

    setTestResults(results)
    setOverallScore(Math.round(totalScore / totalTests))
    generateRecommendations(results)
  }

  const calculateContrast = (hex1, hex2) => {
    try {
      const color1 = Color(hex1)
      const color2 = Color(hex2)
      return color1.contrast(color2)
    } catch (error) {
      return 1
    }
  }

  const generateRecommendations = (results) => {
    const recs = []
    
    // Check for low contrast combinations
    const lowContrast = results.filter(r => !r.wcagAA)
    if (lowContrast.length > 0) {
      recs.push({
        type: 'warning',
        message: `${lowContrast.length} color combination${lowContrast.length > 1 ? 's' : ''} fail${lowContrast.length > 1 ? '' : 's'} WCAG AA standards`,
        details: lowContrast.map(r => `${r.color1.name} + ${r.color2.name} (${r.contrast}:1)`)
      })
    }

    // Check for excellent contrast combinations
    const excellentContrast = results.filter(r => r.wcagAAA)
    if (excellentContrast.length > 0) {
      recs.push({
        type: 'success',
        message: `${excellentContrast.length} color combination${excellentContrast.length > 1 ? 's' : ''} meet${excellentContrast.length > 1 ? '' : 's'} WCAG AAA standards`,
        details: excellentContrast.map(r => `${r.color1.name} + ${r.color2.name} (${r.contrast}:1)`)
      })
    }

    // General recommendations
    if (results.length > 0) {
      const avgContrast = results.reduce((sum, r) => sum + parseFloat(r.contrast), 0) / results.length
      if (avgContrast < 4.0) {
        recs.push({
          type: 'error',
          message: 'Overall contrast is too low for good accessibility',
          details: ['Consider using darker or lighter color variations', 'Test with actual text content']
        })
      }
    }

    setRecommendations(recs)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  if (selectedColors.length < 2) {
    return (
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="text-3xl mr-3">♿</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Accessibility Checker</h2>
            <p className="text-sm text-gray-600">WCAG AA/AAA compliance testing</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">♿</div>
          <p className="text-gray-500 mb-4">
            Select at least 2 colors from the palette to test accessibility
          </p>
          <div className="text-sm text-gray-400">
            We'll test contrast ratios and WCAG compliance
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="text-3xl mr-3">♿</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Accessibility Checker</h2>
            <p className="text-sm text-gray-600">
              {testResults.length} combination{testResults.length !== 1 ? 's' : ''} tested
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </div>
          <div className="text-xs text-gray-500">
            {getScoreLabel(overallScore)}
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Accessibility Score</span>
          <span className={`text-sm font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}% - {getScoreLabel(overallScore)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              overallScore >= 80 ? 'bg-green-500' : 
              overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-gray-900">Contrast Test Results</h3>
        {testResults.map((result, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: result.color1.hex }}
                ></div>
                <span className="text-sm font-medium">{result.color1.name}</span>
                <span className="text-gray-400">+</span>
                <div 
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: result.color2.hex }}
                ></div>
                <span className="text-sm font-medium">{result.color2.name}</span>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${
                  result.wcagAAA ? 'text-green-600' : 
                  result.wcagAA ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.contrast}:1
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  result.wcagAA ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={result.wcagAA ? 'text-green-600' : 'text-red-600'}>
                  WCAG AA {result.wcagAA ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  result.wcagAAA ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <span className={result.wcagAAA ? 'text-green-600' : 'text-gray-500'}>
                  WCAG AAA {result.wcagAAA ? '✓' : '✗'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Recommendations</h3>
          {recommendations.map((rec, index) => (
            <div key={index} className={`p-3 rounded-lg ${
              rec.type === 'success' ? 'bg-green-50 border border-green-200' :
              rec.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className={`font-medium text-sm ${
                rec.type === 'success' ? 'text-green-800' :
                rec.type === 'warning' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                {rec.message}
              </div>
              {rec.details && (
                <ul className="mt-2 text-xs space-y-1">
                  {rec.details.map((detail, i) => (
                    <li key={i} className={`${
                      rec.type === 'success' ? 'text-green-700' :
                      rec.type === 'warning' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      • {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* WCAG Standards Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">WCAG Standards</h3>
        <div className="text-xs text-blue-800 space-y-1">
          <div>• <strong>WCAG AA:</strong> 4.5:1 contrast ratio (minimum)</div>
          <div>• <strong>WCAG AAA:</strong> 7:1 contrast ratio (enhanced)</div>
          <div>• <strong>Large Text:</strong> 3:1 ratio for 18pt+ or 14pt+ bold</div>
        </div>
      </div>
    </div>
  )
}

export default AccessibilityChecker
