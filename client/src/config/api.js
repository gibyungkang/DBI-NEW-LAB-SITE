// API 설정 및 엔드포인트 관리
export const API_CONFIG = {
  // 기본 API URL (환경변수로 관리 가능)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Hero 섹션 관련 API
  HERO: {
    GET_TEXT: '/api/hero-text',
    UPDATE_TEXT: '/api/hero-text',
  },
  
  // 뉴스 관련 API
  NEWS: {
    GET_LIST: '/api/news',
    GET_DETAIL: '/api/news/:id',
  },
  
  // 다이어그램 관련 API
  DIAGRAM: {
    GET_LIST: '/api/diagrams',
    GET_DETAIL: '/api/diagrams/:id',
  }
}

// API 요청 헤더 설정
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
})

// API 요청 유틸리티 함수
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: getHeaders(),
    ...options
  }
  
  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error)
    throw error
  }
}
