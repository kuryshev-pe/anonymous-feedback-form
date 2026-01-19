const mockData = {
    '/api/message': {message: "Test"},
    '/api/csrf-token': {csrfToken: "mock-csrf-token-12345"},
};

export const fetch = (url) => 
  new Promise((resolve) => {
    setTimeout(() => resolve({
      json: () => Promise.resolve(mockData[url]),
      headers: new Map([['X-CSRFToken', 'mock-csrf-token-12345']]),
      ok: true,
    }), 500); // Имитация задержки сети
  });
